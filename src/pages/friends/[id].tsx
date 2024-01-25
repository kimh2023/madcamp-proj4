import LoadingPage from "@/components/styledComponents/LoadingPage";
import FloatGroup from "@/components/todoComponents/FloatGroup";
import CanvasSettings from "@/components/todoComponents/canvas/CanvasSettings";
import TodoCanvas from "@/components/todoComponents/canvas/TodoCanvas";
import TodoPlaceCanvas from "@/components/todoComponents/canvas/TodoPlaceCanvas";
import FriendSideBar from "@/components/todoComponents/sideBar/FriendSideBar";
import { TodoItemDto } from "@/types/TodoDto";
import axiosInstance from "@/utils/api/axiosInstance";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import { formatDate } from "@/utils/formatDate";
import { useSocket } from "@/utils/useSocket";
import { Layout } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const FriendPage = () => {
  const router = useRouter();
  const [place, setPlace] = useState<string>();
  const [todoListState, setTodoListState] = useState<TodoItemDto[]>([]);
  const [friend, setFriend] = useState<{ name: string; carrot: number }>();

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      console.log("join");
      socket.emit("joinMap", { map: Number(router.query.id) });
    }
  }, [router.query.id, socket]);

  useEffect(() => {
    const getTodoItems = async () => {
      if (router.query.id === undefined) {
        return;
      }
      const { data, error } = await axiosWrapper(
        axiosInstance.get(`/friends/${router.query.id}/map`),
      );
      if (error === null) {
        setTodoListState(data.todo as TodoItemDto[]);
        setFriend(data.friend);
      } else {
        router.push(`/todo/${formatDate(null)}`);
      }
    };
    getTodoItems();
  }, [router.query.id]);

  if (!friend || !socket) {
    return <LoadingPage />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <FriendSideBar todoListState={todoListState} friendName={friend.name} />
      <CanvasSettings>
        <React.Fragment>
          {!place && <TodoCanvas socket={socket} setPlace={setPlace} />}
          {place && (
            <TodoPlaceCanvas
              socket={socket}
              isFriendsMap={true}
              place={place}
              setPlace={setPlace}
              todoListState={todoListState}
              setChosenTodo={(chosenTodo: TodoItemDto) => {}}
            />
          )}
        </React.Fragment>
      </CanvasSettings>

      <FloatGroup />
    </Layout>
  );
};

export default FriendPage;
