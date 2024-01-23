"use client";

import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/api/axiosInstance";
import { EditFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { StyledCard } from "../SettingsCard";
import NotFound from "@/components/styledComponents/NotFound";
import { UserDto } from "@/types/UserDto";

const ViewProfile = () => {
  const [userProfileInfo, setUserProfileInfo] = useState<UserDto>();
  const [errorCode, setErrorCode] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    setErrorCode(null);
    const { data, error } = await axiosWrapper(
      axiosInstance.patch("/users", values),
    );

    if (error === null) {
      setIsSuccessVisible(true);
      setTimeout(() => {
        setIsSuccessVisible(false);
        setIsEditMode(false);
        getUser();
      }, 1000);
    } else {
      setErrorCode(error.status);
    }
  };

  const getUser = useCallback(async () => {
    const { data, error } = await axiosWrapper(axiosInstance.get(`/users`));
    if (error === null) {
      setUserProfileInfo(data);
      form.setFieldsValue({
        email: data.email,
        name: data.name,
      });
    } else {
      alert("에러 발생 로직 구현 필요");
    }
  }, [form]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  if (!userProfileInfo) {
    return <NotFound />;
  }

  return (
    <React.Fragment>
      {!isEditMode ? (
        <StyledCard
          title={
            <Flex vertical={false} align="flex-end" gap="middle">
              <Typography.Title level={3} style={{ fontFamily: "Pointer" }}>
                프로필
              </Typography.Title>
              <Button
                type="text"
                shape="circle"
                icon={<EditFilled />}
                style={{ marginBottom: "7px" }}
                onClick={() => setIsEditMode(true)}
              />
            </Flex>
          }
        >
          <Row gutter={[0, 20]}>
            <Col span={6} style={{ textAlign: "right", paddingRight: "8px" }}>
              이메일:
            </Col>
            <Col span={16}>{userProfileInfo.email}</Col>
            <Col span={6} style={{ textAlign: "right", paddingRight: "8px" }}>
              이름:
            </Col>
            <Col span={16}>{userProfileInfo.name}</Col>
            <Col span={6} style={{ textAlign: "right", paddingRight: "8px" }}>
              당근:
            </Col>
            <Col span={16}>{userProfileInfo.carrots}개</Col>
          </Row>
        </StyledCard>
      ) : (
        <StyledCard
          title={
            <Typography.Title level={3} style={{ fontFamily: "Pointer" }}>
              프로필 변경
            </Typography.Title>
          }
        >
          <Form layout="horizontal" {...layout} form={form} onFinish={onFinish}>
            {isSuccessVisible && (
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Alert message={"프로필 변경 성공"} type="success" showIcon />
              </Form.Item>
            )}
            {errorCode && (
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Alert
                  message={
                    errorCode === 409
                      ? "다른 사용자가 사용중인 이메일이야"
                      : "오류가 있었어"
                  }
                  type="error"
                  showIcon
                />
              </Form.Item>
            )}
            <Form.Item
              label="이메일"
              name="email"
              rules={[
                { required: true, message: "이메일을 입력해줘!" },
                { type: "email", message: "올바른 이메일 형식이어야 해!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="이메일"
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="이름"
              name="name"
              rules={[{ required: true, message: "이름을 입력해줘!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="이름"
                allowClear
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "auto" }}
                >
                  변경하기
                </Button>
                <Button
                  htmlType="button"
                  style={{ marginLeft: "auto" }}
                  onClick={() => setIsEditMode(false)}
                >
                  취소하기
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </StyledCard>
      )}
    </React.Fragment>
  );
};

export default ViewProfile;
