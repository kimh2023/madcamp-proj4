import React from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

interface CarrotProps extends GroupProps {
  scale: number;
}

export function Carrot({ scale, ...props }: CarrotProps) {
  const { nodes, materials } = useGLTF("/models/carrot.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Material}
        scale={[scale, scale, scale]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials["Material.001"]}
        position={[-0.025, 2.307 * scale, -0.122]}
        rotation={[-0.495, 0, 0]}
        scale={[0.243 * scale, 0.425 * scale, 0.261 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials["Material.001"]}
        position={[-0.146, 2.307 * scale, 0.068]}
        rotation={[-2.318, 0.867, 2.453]}
        scale={[0.243 * scale, 0.425 * scale, 0.261 * scale]}
      />
    </group>
  );
}

useGLTF.preload("/models/carrot.glb");
