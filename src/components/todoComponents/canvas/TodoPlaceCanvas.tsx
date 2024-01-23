import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Layout } from "antd";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  lazy,
  useMemo,
  useState,
} from "react";
import NotFound from "../../styledComponents/NotFound";
import { Vector3 } from "three";
import { Environment } from "@react-three/drei";
import { Action, TodoItemDto } from "@/types/TodoDto";
import Todo from "./models/Todo";
import Terrain from "./models/Terrain";

const Rabbit = lazy(() => import("./models/Rabbit"));

const TodoCanvasInner = ({
  todoListState,
  setPlace,
}: {
  todoListState: TodoItemDto[];
  setPlace: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 0),
  );
  const currentTodo = useMemo(
    () =>
      todoListState.filter(
        (todoItem) => todoItem.completed_in_progress !== "COMPLETE",
      ).length > 0
        ? todoListState.filter(
            (todoItem) => todoItem.completed_in_progress !== "COMPLETE",
          )[0]
        : null,
    [todoListState],
  );
  console.log(currentTodo);

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    setRabbitPosition(new Vector3(event.point.x, 0, event.point.z));
  };

  return (
    <React.Fragment>
      <Rabbit
        isPlace={true}
        goOut={() => setPlace(undefined)}
        position={rabbitPosition}
        rotation={[0, 0, 0]}
        onClick={() => console.log("hi")}
      />
      {todoListState.map((todoItem, index) => (
        <Todo
          key={index}
          index={index}
          position={[index * 30, 0, 40 * (index % 2)]}
        />
      ))}

      <Terrain onClick={handleCanvasClick} />
    </React.Fragment>
  );
};

const TodoPlaceCanvas = ({
  setPlace,
  todoListState,
  todoListDispatch,
}: {
  setPlace: Dispatch<SetStateAction<string | undefined>>;
  todoListState: TodoItemDto[];
  todoListDispatch: Dispatch<Action>;
}) => {
  return (
    <Layout.Content>
      <Suspense fallback={<NotFound />}>
        <Canvas shadows>
          <Environment preset="sunset" />
          {/* <ambientLight intensity={1} /> */}
          <directionalLight intensity={1} castShadow />
          {/* <OrbitControls /> */}

          {/* <PerspectiveCamera makeDefault position={[10, 10, 10]} /> */}
          <TodoCanvasInner setPlace={setPlace} todoListState={todoListState} />
        </Canvas>
      </Suspense>
    </Layout.Content>
  );
};

export default TodoPlaceCanvas;
