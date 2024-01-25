import { Layout, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { TodoItemDto } from "@/types/TodoDto";
import CheckBoxNoEdit from "./CheckBoxNoEdit";
import NotFound from "../../styledComponents/NotFound";

const FriendSideBar = ({
  todoListState,
  friendName,
}: {
  todoListState: TodoItemDto[];
  friendName: string;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Layout.Sider
      collapsible
      width={300}
      onCollapse={() => setIsVisible((prevState) => !prevState)}
      style={{ height: "100vh" }}
    >
      {isVisible && (
        <SideBarContainer>
          <SideBarImageContainer>
            <Typography.Title style={{ fontFamily: "Pointer" }} level={3}>
              {friendName}의 할 일
            </Typography.Title>

            <TodoContainer>
              {todoListState.length == 0 && <NotFound />}
              {todoListState.map((todoItem: TodoItemDto, index) => (
                <CheckBoxNoEdit key={index} todoItem={todoItem} />
              ))}
            </TodoContainer>
          </SideBarImageContainer>
        </SideBarContainer>
      )}
    </Layout.Sider>
  );
};

export default FriendSideBar;

const SideBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const SideBarImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  overflow: scroll;
  overflow-x: hidden;

  background-image: url(/images/sidebar.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;

  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;
