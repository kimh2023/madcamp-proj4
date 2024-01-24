import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

interface GoOutArrowProps extends MeshProps {}

const GoOutArrow = ({ ...props }: GoOutArrowProps) => {
  const model = useGLTF(`/models/arrow.glb`);

  return (
    <mesh {...props} castShadow>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default GoOutArrow;
