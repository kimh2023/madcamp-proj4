import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

interface HouseProps extends MeshProps {}

const House = ({ ...props }: HouseProps) => {
  const model = useGLTF(`${process.env.FRONTEND_URL}/models/house.glb`);

  return (
    <mesh {...props} castShadow>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default House;
