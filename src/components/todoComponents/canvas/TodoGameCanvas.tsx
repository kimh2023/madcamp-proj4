import { PerspectiveCamera } from "@react-three/drei";
import CanvasSettings from "./CanvasSettings";
import Terrain from "./terrain/Terrain";
import { Action, TodoItemDto } from "@/types/TodoDto";
import { Dispatch, useState } from "react";
import RabbitTodo from "./TodoGameCanvas/RabbitTodo";
import ProgressBar from "./TodoGameCanvas/ProgressBar";
import { useAudio } from "@/utils/useAudio";

const TodoGameCanvas = ({
  chosenTodo,
  todoListDispatch,
}: {
  chosenTodo: TodoItemDto;
  todoListDispatch: Dispatch<Action>;
}) => {
  const [progress, setProgress] = useState(0.05);
  const { playing, toggle } = useAudio("/sounds/point.mp3");

  const handleClick = () => {
    setProgress((prevState) => Math.min(1, prevState + 0.05));
    if (!playing) {
      toggle();
      setTimeout(() => toggle(), 10);
    } else {
      toggle();
    }
  };

  return (
    <CanvasSettings>
      <PerspectiveCamera
        makeDefault
        rotation={[-0, Math.PI / 2, 0]}
        position={[11, 3.5, 0]}
      />
      <ProgressBar progress={progress} />
      <RabbitTodo
        rotation={[0, Math.PI / 2, 0]}
        animation={chosenTodo.animation}
        onClick={handleClick}
      />
      <Terrain />
    </CanvasSettings>
  );
};
export default TodoGameCanvas;
