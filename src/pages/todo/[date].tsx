import { Calendar, Drawer, FloatButton, Layout, Modal, Typography } from "antd";
import SideBar from "@/components/sideBarComponents/SideBar";
import { useRouter } from "next/router";
import NotFound from "@/components/styledComponents/NotFound";
import { useEffect, useReducer, useState } from "react";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/axiosInstance";
import { TodoItemDto } from "@/types/TodoItemDto";
import {
  CalendarFilled,
  LogoutOutlined,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import { formatDate, formatDayjsDate, getDayjs } from "@/utils/formatDate";
import dayjs, { type Dayjs } from "dayjs";

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

type Action =
  | { type: "init"; data: TodoItemDto[] }
  | { type: "new" }
  | { type: "delete"; id: number | string }
  | { type: "modify"; id: number | string; data: Partial<TodoItemDto> };

const reducer = (state: TodoItemDto[], action: Action) => {
  if (action.type === "init") {
    return action.data as TodoItemDto[];
  } else if (action.type === "new") {
    const newTodo = { ...defaultTodo };
    const newOrder = returnHighestOrder(state) + 1;
    newTodo.order_in_date = newOrder;
    newTodo.id = `newTodo${newOrder}`;
    return [...state, newTodo];
  } else if (action.type === "delete") {
    return state.filter((todoItem) => todoItem.id !== action.id);
  } else if (action.type === "modify") {
    const index = state.findIndex((todoItem) => todoItem.id === action.id);
    if (index !== -1) {
      const updatedTodoList = [...state];
      updatedTodoList[index] = {
        ...updatedTodoList[index],
        ...action.data,
      };
      return updatedTodoList;
    }
    return state;
  }
  throw Error("Unknown action.");
};

const TodoPage = () => {
  const [todoListState, todoListDispatch] = useReducer(reducer, []);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const getTodoItems = async () => {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (
        typeof router.query.date !== "string" ||
        !dateFormatRegex.test(router.query.date)
      ) {
        if (router.query.date !== undefined) {
          router.push(`/todo/${formatDate(null)}`);
        }
        return;
      }

      const { data, error } = await axiosWrapper(
        axiosInstance.get(`/todos/${router.query.date}`),
      );
      if (error === null) {
        todoListDispatch({ type: "init", data: data as TodoItemDto[] });
      } else {
        alert("에러 발생 로직 구현 필요");
      }
    };
    getTodoItems();
  }, [router.query.date]);

  const handleLogout = async () => {
    const { data, error } = await axiosWrapper(
      axiosInstance.get(`/auth/logout`),
    );
    if (error === null) {
      setIsModalOpen(false);
    }
  };

  if (typeof router.query.date !== "string" || todoListState === undefined) {
    return <NotFound></NotFound>;
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar
        todoListState={todoListState}
        todoListDispatch={todoListDispatch}
      />
      <Drawer
        width={600}
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        title="날짜 선택하기"
      >
        <Calendar
          defaultValue={getDayjs(router.query.date)}
          disabledDate={(date: Dayjs) => {
            return date && date > dayjs().add(1, "day").endOf("day");
          }}
          onSelect={(date: Dayjs) =>
            router.push(`/todo/${formatDayjsDate(date)}`)
          }
        />
      </Drawer>
      <FloatButton
        style={{ top: 30 }}
        icon={<CalendarFilled />}
        onClick={() => setIsCalendarOpen(true)}
      />
      <FloatButton.Group trigger="click" icon={<SettingFilled />}>
        <FloatButton
          icon={<LogoutOutlined />}
          onClick={() => setIsModalOpen(true)}
          tooltip={
            <Typography.Text style={{ color: "white" }}>
              로그아웃
            </Typography.Text>
          }
        />
        <FloatButton
          icon={<UserOutlined />}
          onClick={() => router.push(`/profile`)}
          tooltip={
            <Typography.Text style={{ color: "white" }}>
              프로필 조회
            </Typography.Text>
          }
        />
      </FloatButton.Group>
      <Modal
        title="진짜로 로그아웃 해?"
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        // confirmLoading={confirmLoading}
        cancelText="앗 아니!"
        okText="응..."
      />
    </Layout>
  );
};

export default TodoPage;