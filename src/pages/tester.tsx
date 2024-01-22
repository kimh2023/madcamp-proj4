import { Suspense, lazy } from "react";

import { Canvas } from "@react-three/fiber";

// import { GLTFLoader } from "three/examples/jsm/Addons.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelComponent = lazy(() => import("../components/models/Rabbit"));

const Tester = () => {
  //   const gltf = useLoader(GLTFLoader, "/rabbit6.gltf");
  //   console.log(process.env, process.env.customKey);
  //   const gltf = useLoader(GLTFLoader, "/public/rabbit6.gtlf");

  return (
    <Suspense fallback={"loading"}>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />

        <mesh position={1}>
          {/* <boxGeometry /> */}
          <ModelComponent />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </Suspense>
  );
};
export default Tester;
