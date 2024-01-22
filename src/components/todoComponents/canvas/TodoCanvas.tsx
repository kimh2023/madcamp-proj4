import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { Layout } from "antd";
import React, { Suspense, lazy, useRef, useState } from "react";
import NotFound from "../../styledComponents/NotFound";
import { Mesh, Vector2, Vector3 } from "three";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

const Rabbit = lazy(() => import("./models/Rabbit"));

const TodoCanvasInner = () => {
  const rabbitRef = useRef<Mesh>(null);
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 1),
  );
  const { raycaster, size, scene } = useThree();
  const camera = useThree((state) => state.camera);

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    console.log(rabbitRef, event);
    if (rabbitRef.current === null) {
      return;
    }
    const { clientX, clientY } = event;
    const mouseX = (clientX / window.innerWidth) * 2 - 1;
    const mouseY = (clientY / window.innerHeight) * 2 - 1;

    const mouse = new Vector2(mouseX, mouseY);
    raycaster.setFromCamera(mouse, camera);
    // raycaster.near = 0.1; // Adjust the near value
    // raycaster.far = 1000;
    // console.log(raycaster.far, raycaster.near);
    console.log(
      clientX,
      window.innerWidth,
      (clientX / window.innerWidth) * 2 - 1,
    );
    console.log(
      clientY,
      window.innerHeight,
      (clientY / window.innerHeight) * 2 - 1,
    );

    console.log(
      "CHECK RAYCASTER",
      raycaster.ray.origin,
      raycaster.ray.direction,
      rabbitRef.current,
    );

    // const intersects = raycaster.intersectObject(rabbitRef.current, true);
    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects);

    // if (intersects.length > 0) {
    //   setRabbitPosition(
    //     new Vector3(intersects[0].point.x, intersects[0].point.y, 0),
    //   );
    //   console.log(intersects[0].point);
    // }
    setRabbitPosition(new Vector3(event.point.x, event.point.y, 0));
  };

  return (
    <React.Fragment>
      {/* <perspectiveCamera
        position={[0, 5, 5]}
        fov={75}
        aspect={size.width / size.height}
        near={0.1}
        far={1000}
      /> */}

      <directionalLight position={[0, 0, 5]} />
      {/* <Rabbit
        ref={rabbitRef}
        position={rabbitPosition}
        onClick={() => console.log("hi")}
      /> */}
      <mesh ref={rabbitRef} position={rabbitPosition}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial />
      </mesh>
      <mesh position={[0, 0, -1]} onClick={handleCanvasClick}>
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
          <ambientLight intensity={1} />
          <OrbitControls />
          <ContactShadows blur={1} />
          <perspectiveCamera
            position={[0, 0, 10]}
            fov={75}
            near={0}
            far={Infinity}
          />
          <TodoCanvasInner />
        </Canvas>
      </Suspense>
    </Layout.Content>
  );
};

export default TodoCanvas;
