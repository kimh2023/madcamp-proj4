import { Canvas, ThreeEvent } from "@react-three/fiber";
import { Layout } from "antd";
import React, { Suspense, lazy, useRef, useState } from "react";
import NotFound from "../../styledComponents/NotFound";
import { Mesh, Vector3 } from "three";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

const Rabbit = lazy(() => import("./models/Rabbit"));

const TodoCanvasInner = () => {
  const rabbitRef = useRef<Mesh>(null);
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
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </React.Fragment>
  );
};

const TodoCanvas = () => {
  return (
    <Layout.Content>
      <Suspense fallback={<NotFound />}>
        <Canvas>
          <Environment preset="sunset" />
          <ambientLight intensity={1} castShadow />
          <OrbitControls />
          <ContactShadows
            opacity={0.5}
            scale={11}
            blur={5}
            near={-1}
            far={30}
            resolution={512}
          />
          <PerspectiveCamera makeDefault position={[10, 10, 10]} />
          <TodoCanvasInner />
        </Canvas>
      </Suspense>
    </Layout.Content>
  );
};

export default TodoCanvas;
