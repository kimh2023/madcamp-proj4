"use client";

import MainLayout from "@/components/settingsComponents/MainLayout";
import { StyledCard } from "@/components/settingsComponents/SettingsCard";
import axiosInstance from "@/utils/api/axiosInstance";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import {
  DeleteFilled,
  KeyOutlined,
  MailOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { FriendShipDto } from "@/types/UserDto";
import { useRouter } from "next/router";

const FriendPage = () => {
  const router = useRouter();
  const [friends, setFriends] = useState<FriendShipDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const getFriends = async () => {
      const { data, error } = await axiosWrapper(axiosInstance.get("/friends"));
      if (error === null) {
        setFriends(data);
        console.log(data);
      }
    };
    getFriends();
  }, []);

  const onFinish = async () => {
    setErrorCode(null);
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        const { data, error } = await axiosWrapper(
          axiosInstance.post("/friends", values),
        );
        if (error === null) {
          setFriends(data);
          setIsSuccessVisible(true);
          setTimeout(() => {
            setIsModalOpen(false);
            setIsSuccessVisible(false);
          }, 500);
        } else {
          setErrorCode(error.status);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const deleteFriend = async (id: number) => {
    const { data, error } = await axiosWrapper(
      axiosInstance.delete(`/friends/${id}`),
    );
    if (error === null) {
      setFriends(data);
    }
  };

  return (
    <React.Fragment>
      <StyledCard
        title={
          <Flex vertical={false} align="flex-end" gap="middle">
            <Typography.Title level={3} style={{ fontFamily: "Pointer" }}>
              친구 목록
            </Typography.Title>
            <Tooltip placement="top" title={"친구 추가하기"}>
              <Button
                type="text"
                shape="circle"
                icon={<PlusOutlined />}
                style={{ marginBottom: "8px", marginLeft: "auto" }}
                onClick={() => setIsModalOpen(true)}
              />
            </Tooltip>
          </Flex>
        }
      >
        <Flex vertical gap={20}>
          {friends.map((friend, index) => (
            <Flex key={index} vertical={false} align="center" gap={15}>
              <Avatar
                size={45}
                name={friend.user2.name}
                variant="beam"
                colors={["#ffffff", "#84dcc6", "#a5ffd6", "#ffa69e", "#ff686b"]}
              />
              <Flex vertical>
                <Typography.Text style={{ fontSize: "1rem" }}>
                  {friend.user2.name}
                </Typography.Text>
                <Typography.Text style={{ fontSize: "0.8rem" }}>
                  {friend.user2.email}
                </Typography.Text>
              </Flex>
              <Tooltip placement="top" title={"친구의 방으로 떠나봐!"}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<KeyOutlined />}
                  style={{ marginLeft: "auto" }}
                  onClick={() => router.push(`/friends/${friend.user2.id}`)}
                />
              </Tooltip>
              <Tooltip placement="top" title={"친구 삭제하기"}>
                <Button
                  danger
                  shape="circle"
                  icon={<DeleteFilled />}
                  onClick={() => deleteFriend(friend.user2.id)}
                />
              </Tooltip>
            </Flex>
          ))}
        </Flex>
      </StyledCard>

      <Modal
        title="친구 찾기:"
        open={isModalOpen}
        onOk={onFinish}
        onCancel={() => {
          setIsModalOpen(false);
          setErrorCode(null);
          setIsSuccessVisible(false);
        }}
        cancelText="취소"
        okText="확인"
      >
        <Form layout="horizontal" form={form}>
          {isSuccessVisible && (
            <Form.Item>
              <Alert message={"친구 추가 성공"} type="success" showIcon />
            </Form.Item>
          )}
          {errorCode && (
            <Form.Item>
              <Alert
                message={
                  errorCode === 409
                    ? "이미 친구입니다."
                    : "존제하지 않는 회원입니다"
                }
                type="error"
                showIcon
              />
            </Form.Item>
          )}
          <Form.Item
            name="friendEmail"
            rules={[
              { required: true, type: "email", message: "이메일을 입력해줘!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="친구의 이메일 입력"
              value={form.getFieldValue("friendEmail")}
              allowClear
            />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default FriendPage;

FriendPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
