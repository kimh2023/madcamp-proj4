"use client";

import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/axiosInstance";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { StyledCard } from "../SettingsCard";

const ChangePassword = () => {
  const [errorCode, setErrorCode] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values);
    setErrorCode(null);
    const { data, error } = await axiosWrapper(
      axiosInstance.post("/auth/change-password", values),
    );
    console.log(data, error);

    if (error === null) {
      setIsSuccessVisible(true);
      setTimeout(() => {
        setIsSuccessVisible(false);
        form.resetFields();
      }, 1000);
    } else {
      form.resetFields();
      setErrorCode(error.status);
    }
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <StyledCard
      title={
        <Typography.Title level={3} style={{ fontFamily: "Pointer" }}>
          비밀번호 변경
        </Typography.Title>
      }
    >
      <Form layout="horizontal" {...layout} form={form} onFinish={onFinish}>
        {isSuccessVisible && (
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Alert message={"비밀번호 변경 성공"} type="success" showIcon />
          </Form.Item>
        )}
        {errorCode && (
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Alert message={" 비밀번호가 틀렸어"} type="error" showIcon />
          </Form.Item>
        )}
        <Form.Item
          label="현재 비밀번호"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해줘!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="현재 비밀번호 입력"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="새 비밀번호"
          name="newpassword"
          rules={[
            { required: true, message: "새 비밀번호를 입력해줘!" },
            { min: 8, message: "새 비밀번호를 8자 이상으로 설정해 줘!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="새 비밀번호 입력"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="새 비밀번호 확인"
          name="confirmPassword"
          rules={[
            { required: true, message: "새 비밀번호를 다시 입력해 줘!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newpassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("비밀번호가 일치하지 않아ㅠㅠ");
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="새 비밀번호 확인"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            allowClear
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            변경하기
          </Button>
        </Form.Item>
      </Form>
    </StyledCard>
  );
};

export default ChangePassword;
