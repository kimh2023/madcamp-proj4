import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Layout } from "antd";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  lazy,
  useState,
} from "react";
import NotFound from "../../styledComponents/NotFound";
import { Vector3 } from "three";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Road from "./models/Road";
import School from "./models/School";
import Terrain from "./models/Terrain";

const Rabbit = lazy(() => import("./models/Rabbit"));

const TodoCanvasInner = ({
  setPlace,
}: {
  setPlace: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 0),
  );

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    const x = Math.max(-4.5, Math.min(4.5, event.point.x));
    setRabbitPosition(new Vector3(x, 0, event.point.z));
  };

  return (
    <React.Fragment>
      <Rabbit
        position={rabbitPosition}
        rotation={[0, 0, 0]}
        onClick={() => console.log("hi")}
      />
      <Road />
      <School
        position={[-20, -1, 0]}
        onPointerEnter={() => {
          if (document.querySelector("body") !== null) {
            (document.querySelector("body") as HTMLBodyElement).style.cursor =
              "var(--cursor-pointer) 8 2, pointer";
          }
        }}
        onPointerLeave={() => {
          if (document.querySelector("body") !== null) {
            (document.querySelector("body") as HTMLBodyElement).style.cursor =
              "var(--cursor-auto) 8 2, auto";
          }
        }}
        onClick={() => {
          setPlace("school");
          if (document.querySelector("body") !== null) {
            (document.querySelector("body") as HTMLBodyElement).style.cursor =
              "var(--cursor-auto) 8 2, auto";
          }
        }}
      />

      <Terrain onClick={handleCanvasClick} />
    </React.Fragment>
  );
};

const TodoCanvas = ({
  setPlace,
}: {
  setPlace: Dispatch<SetStateAction<string | undefined>>;
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
          <TodoCanvasInner setPlace={setPlace} />
        </Canvas>
      </Suspense>
    </Layout.Content>
  );
};

export default TodoCanvas;
