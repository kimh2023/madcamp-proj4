import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Alert, Button, Form, Input, Layout, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { formatDate } from "../../utils/formatDate";
import { useState } from "react";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/axiosInstance";

const LoginPage = () => {
  const router = useRouter();
  const [errorCode, setErrorCode] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    setErrorCode(null);
    const { data, error } = await axiosWrapper(
      axiosInstance.post("/auth/login", values),
    );

    if (error === null) {
      setIsSuccessVisible(true);
      setTimeout(() => router.push(`/todo/${formatDate(null)}`), 500);
    } else {
      setErrorCode(error.status);
    }
  };

  return (
    <BackGroundLayout>
      <AuthDiv>
        <Image
          src={`/images/auth-rabbit.png`}
          alt="logo"
          width={176}
          height={176}
        />
        <Typography.Title level={2} style={{ fontFamily: "Pointer" }}>
          로그인
        </Typography.Title>

        <Form layout="horizontal" form={form} onFinish={onFinish}>
          {isSuccessVisible && (
            <Alert
              message={"로그인 성공"}
              type="success"
              showIcon
              style={{ marginBottom: "20px" }}
            />
          )}
          {errorCode && (
            <Alert
              message={
                errorCode === 500
                  ? "이메일 또는 비밀번호가 틀렸어"
                  : "존제하지 않는 회원입니다"
              }
              type="error"
              showIcon
              style={{ marginBottom: "20px" }}
            />
          )}
          <Form.Item
            name="email"
            rules={[
              { required: true, type: "email", message: "이메일을 입력해줘!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="이메일"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해줘!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="비밀번호"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              allowClear
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              로그인
            </Button>
          </Form.Item>
          <Button
            type="text"
            style={{ width: "100%" }}
            onClick={() => router.push("/auth/signup")}
          >
            회원가입
          </Button>
        </Form>
      </AuthDiv>
    </BackGroundLayout>
  );
};
export default LoginPage;

export const BackGroundLayout = styled(Layout)`
  background-image: url(${process.env.FRONTEND_URL}/images/auth.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
`;

export const AuthDiv = styled.div`
  margin: auto;
  width: 400px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  padding-bottom: 50px;
  row-gap: 15px;
`;
