import { PerspectiveCamera } from "@react-three/drei";
import Terrain from "./terrain/Terrain";
import { Action, TodoItemDto } from "@/types/TodoDto";
import React, { Dispatch, useState } from "react";
import RabbitTodo from "./TodoGameCanvas/RabbitTodo";
import ProgressBar from "./TodoGameCanvas/ProgressBar";
import { useAudio } from "@/utils/useAudio";
import CompleteMessage from "./TodoGameCanvas/Complete";
import { axiosWrapper } from "@/utils/api/axiosWrapper";
import axiosInstance from "@/utils/api/axiosInstance";
import { MessageInstance } from "antd/es/message/interface";

const TodoGameCanvas = ({
  chosenTodo,
  setChosenTodo,
  todoListDispatch,
  messageApi,
}: {
  chosenTodo: TodoItemDto;
  setChosenTodo: () => void;
  todoListDispatch: Dispatch<Action>;
  messageApi: MessageInstance;
}) => {
  const [progress, setProgress] = useState(0.1);
  const { playing, toggle } = useAudio("/sounds/point.mp3");

  const handleClick = async () => {
    setProgress((prevState) => Math.min(1, prevState + 0.1));
    if (!playing) {
      toggle();
      setTimeout(() => toggle(), 10);
    } else {
      toggle();
    }
    if (progress >= 0.9) {
      const { data, error } = await axiosWrapper(
        axiosInstance.patch(`/todos/${chosenTodo.id}`, {
          ...chosenTodo,
          completed_in_progress: "COMPLETE",
        }),
      );
      if (error === null) {
        todoListDispatch({
          type: "modify",
          id: chosenTodo.id,
          data: { completed_in_progress: "COMPLETE" },
        });
        messageApi.success("성공적으로 저장했습니다!");
        setTimeout(() => setChosenTodo(), 5000);
      } else {
        messageApi.error("오류가 있었습니다");
      }
    } else if (
      progress > 0.3 &&
      chosenTodo.completed_in_progress === "NOT_DONE"
    ) {
      const { data, error } = await axiosWrapper(
        axiosInstance.patch(`/todos/${chosenTodo.id}`, {
          ...chosenTodo,
          completed_in_progress: "IN_PROGRESS",
        }),
      );
      if (error === null) {
        todoListDispatch({
          type: "modify",
          id: chosenTodo.id,
          data: { completed_in_progress: "IN_PROGRESS" },
        });
      }
    }
  };

  return (
    <React.Fragment>
      <PerspectiveCamera
        makeDefault
        rotation={[-0, Math.PI / 2, 0]}
        position={[11, 3.5, 0]}
      />
      <React.Fragment>
        {progress !== 1 && <ProgressBar progress={progress} />}
        {progress === 1 && <CompleteMessage />}
      </React.Fragment>
      <RabbitTodo
        rotation={[0, Math.PI / 2, 0]}
        animation={chosenTodo.animation}
        onClick={handleClick}
      />
      <Terrain />
    </React.Fragment>
  );
};
export default TodoGameCanvas;
