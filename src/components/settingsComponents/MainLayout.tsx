import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/api/axiosInstance";
import { formatDate } from "@/utils/formatDate";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { FloatButton, Layout, Menu, Modal, Typography } from "antd";
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
  const [isVisible, setIsVisible] = useState(true);

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
      <Layout.Sider
        collapsible
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10000,
        }}
        onCollapse={() => setIsVisible((prevState) => !prevState)}
      >
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
      <StyledContent isvisible={isVisible.toString()}>{children}</StyledContent>
      <Modal
        title="진짜로 로그아웃 해?"
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        cancelText="앗 아니!"
        okText="응..."
      />
      <FloatButton
        icon={
          <Icon
            component={() => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#000000"
                  d="M5.235 2.076a.5.5 0 0 1 .489-.023l4.749 2.374l3.762-2.351A.5.5 0 0 1 15 2.5V11a.5.5 0 0 1-.235.424l-4 2.5a.5.5 0 0 1-.489.023l-4.749-2.374l-3.762 2.351A.5.5 0 0 1 1 13.5V5a.5.5 0 0 1 .235-.424zM6 10.691l4 2V5.309l-4-2zM5 3.402L2 5.277v7.32l3-1.874zm6 1.875v7.32l3-1.874v-7.32z"
                ></path>
              </svg>
            )}
          />
        }
        onClick={() => router.push(`/todo/${formatDate(null)}`)}
        tooltip={
          <Typography.Text style={{ color: "white" }}>
            오늘의 할 일
          </Typography.Text>
        }
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

interface StyledContentProps {
  isvisible: string;
}

const StyledContent = styled(Layout.Content)<StyledContentProps>`
  background-image: url(/images/paper.jpg);
  background-size: 400px 400px;
  background-repeat: repeat;
  min-height: 100vh;
  min-width: 500px;

  display: flex;
  flex-direction: column;
  row-gap: 50px;

  padding: 50px;
  margin-left: ${(props) => (props.isvisible === "true" ? "200px" : "80px")};
`;
