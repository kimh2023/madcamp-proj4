import { useTexture } from "@react-three/drei";
import React from "react";
import { DoubleSide } from "three";

const Arrow = ({ index }: { index: number }) => {
  const texture = useTexture(`/images/arrow.png`);
  texture.repeat.set(1, 1);

  const arrowCount = 8;
  const radius = 35;

  return (
    <group>
      {index % 2 === 0 &&
        Array.from({ length: arrowCount }).map((_, index) => {
          const rotationZ = Math.PI + index * 0.16; // Adjust angleIncrement as needed
          const positionX = radius * Math.cos(rotationZ);
          const positionZ = -radius * Math.sin(rotationZ);

          return (
            <mesh
              key={index}
              rotation={[-Math.PI / 2, 0, rotationZ]}
              position={[positionX + 35, 0, 8 + positionZ]}
              receiveShadow
            >
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial
                attach="material"
                map={texture}
                side={DoubleSide}
                transparent
              />
            </mesh>
          );
        })}
      {index % 2 !== 0 &&
        Array.from({ length: arrowCount }).map((_, index) => {
          const rotationZ = -Math.PI + index * 0.16; // Adjust angleIncrement as needed
          const positionX = radius * Math.cos(rotationZ);
          const positionZ = radius * Math.sin(rotationZ);

          return (
            <mesh
              key={index}
              rotation={[Math.PI / 2, 0, rotationZ]}
              position={[positionX + 35, 0, -8 + positionZ]}
              receiveShadow
            >
              <planeGeometry args={[2, 2]} />
              <meshStandardMaterial
                attach="material"
                map={texture}
                side={DoubleSide}
                transparent
              />
            </mesh>
          );
        })}
    </group>
  );
};
export default Arrow;
