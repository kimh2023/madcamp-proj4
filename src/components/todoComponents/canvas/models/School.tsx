import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

interface SchoolProps extends MeshProps {}

const School = ({ ...props }: SchoolProps) => {
  const model = useGLTF(`${process.env.FRONTEND_URL}/models/school.glb`);

  return (
    <mesh {...props} castShadow>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default School;
