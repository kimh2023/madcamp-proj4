import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

interface ExerciseProps extends MeshProps {}

const Exercise = ({ ...props }: ExerciseProps) => {
  const model = useGLTF(
    `${process.env.FRONTEND_URL}/models/no-rabbit-exercising.glb`,
  );

  return (
    <mesh {...props} castShadow>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default Exercise;
