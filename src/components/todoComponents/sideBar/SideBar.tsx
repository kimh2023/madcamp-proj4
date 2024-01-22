import { Button, Layout, Typography, message } from "antd";
import { Dispatch, useEffect, useState } from "react";
import CheckBoxEdit from "./CheckBoxEdit";
import styled from "styled-components";
const { Header, Content, Footer, Sider } = Layout;
import { Action, TodoItemDto } from "@/types/TodoDto";
import CheckBoxNoEdit from "./CheckBoxNoEdit";
import { EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";
import NotFound from "../../styledComponents/NotFound";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { getDate } from "@/utils/formatDate";

const SideBar = ({
  todoListState,
  todoListDispatch,
}: {
  todoListState: TodoItemDto[];
  todoListDispatch: Dispatch<Action>;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const deleteTodoItem = async (id: number | string) => {
    let success = true;
    if (typeof id === "number") {
      const { data, error } = await axiosWrapper(
        axiosInstance.delete(`/todos/${id}`),
      );
      success = error === null;
      console.log(data, error);
    }
    if (success) {
      todoListDispatch({ type: "delete", id: id });
      messageApi.success("삭제했습니다!");
    } else {
      messageApi.error("오류가 있었습니다");
    }
  };

  const handleEdit = async () => {
    let allError = false;

    if (isEditMode) {
      setIsUpdating(true);
      await Promise.all(
        todoListState.map(async (todoItem) => {
          if (typeof todoItem.id === "string") {
            if (todoItem.task === "") {
              todoListDispatch({ type: "delete", id: todoItem.id });
            } else {
              const { data, error } = await axiosWrapper(
                axiosInstance.post(`/todos`, {
                  ...todoItem,
                  id: null,
                  date: getDate(router.query.date),
                }),
              );
              if (error === null) {
                todoListDispatch({
                  type: "modify",
                  id: todoItem.id,
                  data: data,
                });
              } else {
                allError = true;
              }
            }
          } else {
            const { data, error } = await axiosWrapper(
              axiosInstance.patch(`/todos/${todoItem.id}`, todoItem),
            );
            if (error !== null) {
              allError = true;
            }
          }
        }),
      );
      if (allError) {
        messageApi.error("오류가 있었습니다");
      } else {
        messageApi.success("성공적으로 저장했습니다!");
      }
      setTimeout(() => setIsUpdating(false), 1000);
    }
    setIsEditMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (isEditMode && !isUpdating && todoListState.length == 0) {
      todoListDispatch({ type: "new" });
    }
  });

  return (
    <Layout.Sider
      collapsible
      width={isEditMode ? 700 : 300}
      onCollapse={() => setIsVisible((prevState) => !prevState)}
      style={{ height: "100vh" }}
    >
      {contextHolder}
      {isVisible && (
        <SideBarContainer>
          <SideBarImageContainer>
            <Typography.Title style={{ fontFamily: "Pointer" }} level={3}>
              오늘 할 일
            </Typography.Title>

            <TodoContainer>
              {todoListState.length == 0 && !isEditMode && <NotFound />}
              {isEditMode
                ? todoListState.map((todoItem: TodoItemDto, index) => (
                    <CheckBoxEdit
                      key={index}
                      todoItem={todoItem}
                      setTodoItemState={(newState) =>
                        todoListDispatch({
                          type: "modify",
                          id: todoItem.id,
                          data: newState,
                        })
                      }
                      deleteTodoItem={() => deleteTodoItem(todoItem.id)}
                    />
                  ))
                : todoListState.map((todoItem: TodoItemDto, index) => (
                    <CheckBoxNoEdit key={index} todoItem={todoItem} />
                  ))}
              {isEditMode && (
                <Button
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  onClick={() => todoListDispatch({ type: "new" })}
                >
                  할 일 추가하기
                </Button>
              )}
            </TodoContainer>

            <Button
              shape="circle"
              size="large"
              type="primary"
              icon={
                isEditMode ? (
                  <SaveFilled color="#FFF" />
                ) : (
                  <EditFilled color="#FFF" />
                )
              }
              style={{ marginTop: "auto", marginLeft: "auto" }}
              onClick={handleEdit}
            />
          </SideBarImageContainer>
        </SideBarContainer>
      )}
    </Layout.Sider>
  );
};

export default SideBar;

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

  background-image: url(${process.env.FRONTEND_URL}/images/sidebar.png);
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
