import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Layout } from "antd";
import React, {
  Dispatch,
  Suspense,
  lazy,
  useMemo,
  useRef,
  useState,
} from "react";
import NotFound from "../../styledComponents/NotFound";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Action, TodoItemDto } from "@/types/TodoDto";
import Todo from "./models/Todo";
import Terrain from "./models/Terrain";
import Arrow from "./models/Arrow";
import { BufferGeometry, Mesh, NormalBufferAttributes, Vector3 } from "three";

const Rabbit = lazy(() => import("./models/Rabbit"));

const TodoCanvasInner = ({
  todoListState,
}: {
  todoListState: TodoItemDto[];
}) => {
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
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
        mesh={mesh}
        position={rabbitPosition}
        rotation={[0, 0, 0]}
        onClick={() => console.log("hi")}
      />
      {todoListState.map((todoItem, index) => (
        <Todo key={index} position={[index * 20, 0, 20 * (index % 2)]} />
      ))}

      <Terrain onClick={handleCanvasClick} />
      <Arrow />
    </React.Fragment>
  );
};

const TodoPlaceCanvas = ({
  todoListState,
  todoListDispatch,
}: {
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
          <OrbitControls />

          <PerspectiveCamera makeDefault position={[10, 10, 10]} />
          <TodoCanvasInner todoListState={todoListState} />
        </Canvas>
      </Suspense>
    </Layout.Content>
  );
};

export default TodoPlaceCanvas;
