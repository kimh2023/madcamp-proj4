import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Layout } from "antd";
import React, { Dispatch, Suspense, lazy, useState } from "react";
import NotFound from "../../styledComponents/NotFound";
import { Vector3 } from "three";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Action, TodoItemDto } from "@/types/TodoDto";

const Rabbit = lazy(() => import("./models/Rabbit"));

const TodoCanvasInner = ({
  todoListState,
}: {
  todoListState: TodoItemDto[];
}) => {
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 0),
  );

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    setRabbitPosition(new Vector3(event.point.x, 0, event.point.z));
  };

  return (
    <React.Fragment>
      <Rabbit
        position={rabbitPosition}
        rotation={[0, 0, 0]}
        onClick={() => console.log("hi")}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.2, 0]}
        onClick={handleCanvasClick}
        receiveShadow
      >
        <planeGeometry args={[10000, 10000]} />
        <meshStandardMaterial color="gray" />
      </mesh>
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
