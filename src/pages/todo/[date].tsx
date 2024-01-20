import { Layout } from "antd";
import SideBar from "@/components/sideBarComponents/SideBar";
import { useRouter } from "next/router";
import NotFound from "@/components/styledComponents/NotFound";
import { TodoItemDto } from "@/types/TodoItemDto";
import { useEffect, useState } from "react";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/axiosInstance";

const TodoPage = () => {
  const [todoListState, setTodoListState] = useState<TodoItemDto[]>();

  const router = useRouter();

  useEffect(() => {
    const getTodoItems = async () => {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (
        typeof router.query.date !== "string" ||
        !dateFormatRegex.test(router.query.date)
      ) {
        return;
      }

      const { data, error } = await axiosWrapper(
        axiosInstance.get(`/todos/${router.query.date}`),
      );
      if (error === null) {
        setTodoListState(data);
      } else {
        alert("에러 발생 로직 구현 필요");
      }
    };
    getTodoItems();
  }, [router.query.date]);

  if (typeof router.query.date !== "string" || todoListState === undefined) {
    return <NotFound></NotFound>;
  }

  const date = new Date(router.query.date);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar date={date} />
    </Layout>
  );
};

export default TodoPage;
