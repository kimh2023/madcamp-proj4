import { Button, FloatButton, Layout, Typography, message } from "antd";
import { useCallback, useState } from "react";
import CheckBoxEdit from "./CheckBoxEdit";
import styled from "styled-components";
const { Header, Content, Footer, Sider } = Layout;
import { TodoItemDto } from "@/types/TodoItemDto";
import CheckBoxNoEdit from "./CheckBoxNoEdit";
import { EditFilled, PlusOutlined, SaveFilled } from "@ant-design/icons";

const defaultTodo: TodoItemDto = {
  id: 0,
  task: "",
  date: new Date(),
  place: "HOME",
  animation: "STUDY",
  order_in_date: 0,
  completed_in_progress: "NOT_DONE",
};

const returnHighestOrder = (todoListState: TodoItemDto[]) => {
  if (todoListState.length === 0) {
    return 0;
  }
  return Math.max(...todoListState.map((item) => item.order_in_date));
};

const SideBar = ({ date }: { date: Date }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditMode, setIsEditMode] = useState(true);
  const todoList = [
    {
      id: 1,
      task: "영어 공부",
      date: date,
      place: "HOME",
      animation: "STUDY",
      order_in_date: 1,
      completed_in_progress: "COMPLETE",
    },
    {
      id: 2,
      task: "화학 공부",
      date: date,
      place: "SCHOOL",
      animation: "STUDY",
      order_in_date: 4,
      completed_in_progress: "IN_PROGRESS",
    },
    {
      id: 3,
      task: "몰라 공부",
      date: date,
      place: "HOME",
      animation: "CLEAN",
      order_in_date: 5,
      completed_in_progress: "NOT_DONE",
    },
  ];
  const [todoListState, setTodoListState] = useState<TodoItemDto[]>(todoList);
  const setTodoItemState = useCallback(
    (todoItemId: number | string, newState: Partial<TodoItemDto>) => {
      setTodoListState((prevState) => {
        const index = prevState.findIndex((item) => item.id === todoItemId);

        if (index !== -1) {
          const updatedTodoList = [...prevState];
          updatedTodoList[index] = { ...updatedTodoList[index], ...newState };
          return updatedTodoList;
        }

        return prevState;
      });
    },
    [],
  );

  const [messageApi, contextHolder] = message.useMessage();

  const addTodoItem = () => {
    const newTodo = { ...defaultTodo };
    const newOrder = returnHighestOrder(todoListState) + 1;
    newTodo.order_in_date = newOrder;
    newTodo.id = `newTodo${newOrder}`;
    setTodoListState((prevState) => [...prevState, newTodo]);
  };

  const deleteTodoItem = (id: number | string) => {
    alert("backend!!");
    setTodoListState((prevState) =>
      prevState.filter((todoItem) => todoItem.id !== id),
    );
    messageApi.info("삭제했습니다!");
  };

  const handleEdit = async () => {
    if (isEditMode) {
      alert("handleSave");
      messageApi.info("저장했습니다!");
    }
    setIsEditMode((prevState) => !prevState);
  };

  return (
    <Sider
      collapsible
      width={isEditMode ? 700 : 300}
      onCollapse={() => setIsVisible((prevState) => !prevState)}
    >
      {contextHolder}
      {isVisible && (
        <SideBarContainer>
          <SideBarImageContainer>
            <Typography.Title style={{ fontFamily: "Pointer" }} level={3}>
              오늘 할 일
            </Typography.Title>

            <TodoContainer>
              {isEditMode
                ? todoListState.map((todoItem: TodoItemDto, index) => (
                    <CheckBoxEdit
                      key={index}
                      todoItem={todoItem}
                      setTodoItemState={(newState) =>
                        setTodoItemState(todoItem.id, newState)
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
                  onClick={addTodoItem}
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
            <FloatButton />
          </SideBarImageContainer>
        </SideBarContainer>
      )}
    </Sider>
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
