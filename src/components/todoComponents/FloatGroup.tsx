import {
  MoreOutlined,
  RocketOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FloatButton, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";

const FloatGroup = () => {
  const router = useRouter();
  return (
    <FloatButton.Group trigger="click" icon={<MoreOutlined />}>
      <FloatButton
        icon={<UserOutlined />}
        onClick={() => router.push(`/settings/profile`)}
        tooltip={
          <Typography.Text style={{ color: "white" }}>
            프로필 설정
          </Typography.Text>
        }
      />
      <FloatButton
        icon={<SettingOutlined />}
        onClick={() => router.push(`/settings/account`)}
        tooltip={
          <Typography.Text style={{ color: "white" }}>
            계정 설정
          </Typography.Text>
        }
      />
      <FloatButton
        icon={<RocketOutlined />}
        onClick={() => router.push(`/settings/friends`)}
        tooltip={
          <Typography.Text style={{ color: "white" }}>
            친구 설정
          </Typography.Text>
        }
      />
    </FloatButton.Group>
  );
};

export default React.memo(FloatGroup);
