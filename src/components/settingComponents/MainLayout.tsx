import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/axiosInstance";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import { MenuProps } from "antd/lib";
import { useRouter } from "next/router";
import React, { JSXElementConstructor, ReactElement, useState } from "react";
import styled from "styled-components";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("프로필 설정", "profile", <UserOutlined />),
  getItem("계정 설정", "account", <SettingOutlined />),
];

const logoutItem: MenuItem[] = [
  getItem("로그아웃", "logout", <LogoutOutlined />),
];

const MainLayout = ({
  children,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    const { data, error } = await axiosWrapper(
      axiosInstance.get(`/auth/logout`),
    );
    if (error === null) {
      setIsModalOpen(false);
      router.push("/auth/login");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider collapsible>
        <MenuContainer>
          <Menu
            theme="dark"
            items={items}
            onClick={({ key }) => router.push("/settings/" + key)}
            selectedKeys={[router.pathname.split("/").pop() as string]}
          />
          <Menu
            theme="dark"
            items={logoutItem}
            style={{ marginTop: "auto" }}
            onClick={async ({ key }) => {
              switch (key) {
                case "logout": {
                  setIsModalOpen(true);
                  return;
                }
              }
            }}
            selectedKeys={[]}
          />
        </MenuContainer>
      </Layout.Sider>
      <StyledContent>{children}</StyledContent>
      <Modal
        title="진짜로 로그아웃 해?"
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        cancelText="앗 아니!"
        okText="응..."
      />
    </Layout>
  );
};

export default MainLayout;

const MenuContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

export const StyledContent = styled(Layout.Content)`
  background-image: url(${process.env.FRONTEND_URL}/images/auth.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  padding: 50px;
`;
