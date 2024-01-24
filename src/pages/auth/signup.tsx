import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthDiv, BackGroundLayout } from "./login";
import { formatDate } from "../../utils/formatDate";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/api/axiosInstance";
import { SignUpDto } from "@/types/AuthDto";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [errorCode, setErrorCode] = useState(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [form] = Form.useForm();
  const onFinish = async (values: SignUpDto) => {
    console.log(values);
    setErrorCode(null);
    const { data, error } = await axiosWrapper(
      axiosInstance.post("/auth/signup", values),
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
          회원가입
        </Typography.Title>
        <Form layout="horizontal" form={form} onFinish={onFinish}>
          {errorCode && (
            <Alert
              message={
                errorCode === 500
                  ? "오류가 있었어ㅠㅠ"
                  : "이미 존제하는 회원입니다"
              }
              type="error"
              showIcon
              style={{ marginBottom: "20px" }}
            />
          )}
          {isSuccessVisible && (
            <Alert
              message={"회원가입 성공"}
              type="success"
              showIcon
              style={{ marginBottom: "20px" }}
            />
          )}
          <Form.Item
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
            name="name"
            rules={[{ required: true, message: "이름을 입력해줘!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="이름"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "비밀번호를 입력해줘!" },
              { min: 8, message: "비밀번호를 8자 이상으로 설정해 줘!" },
            ]}
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
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "비밀번호를 다시 입력해 줘!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("비밀번호가 일치하지 않아ㅠㅠ");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="비밀번호 확인"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              allowClear
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              가입하기
            </Button>
          </Form.Item>
          <Button
            type="text"
            style={{ width: "100%" }}
            onClick={() => router.push("/auth/login")}
          >
            로그인
          </Button>
        </Form>
      </AuthDiv>
    </BackGroundLayout>
  );
};
export default SignupPage;
