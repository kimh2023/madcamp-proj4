import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { MenuProps } from "antd/lib";
import React, { JSXElementConstructor, ReactElement } from "react";
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
  getItem("계정 설정", 1, <SettingOutlined />),
  getItem("프로필 설정", 2, <UserOutlined />),
];

const logoutItem: MenuItem[] = [
  getItem("로그아웃", "/logout", <LogoutOutlined />),
];

const MainLayout = ({
  children,
}: {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider collapsible>
        <MenuContainer>
          <Menu
            theme="dark"
            items={items}
            onClick={({ key }) => console.log(key)}
          />
          <Menu
            theme="dark"
            items={logoutItem}
            style={{ marginTop: "auto" }}
            onClick={({ key }) => {
              switch (key) {
                case "logout":
                  return;
              }
            }}
          />
        </MenuContainer>
      </Layout.Sider>
      <Layout.Content>{children}</Layout.Content>
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
