import { useTexture } from "@react-three/drei";
import React from "react";
import { DoubleSide, Vector3 } from "three";

const Stickers = () => {
  const texture1 = useTexture(`/images/stickers/sticker-1.png`);
  const texture2 = useTexture(`/images/stickers/sticker-2.png`);
  const texture3 = useTexture(`/images/stickers/sticker-3.png`);
  const texture4 = useTexture(`/images/stickers/sticker-4.png`);
  const texture5 = useTexture(`/images/stickers/sticker-5.png`);
  const allTextures = [texture1, texture2, texture3, texture4, texture5];

  allTextures.forEach((texture) => {
    texture.repeat.set(1, 1);
  });

  const getRandomFloat = () => Math.random() * (100 - -100) + -100;

  const getRandomRotation = () => Math.random() * Math.PI * 2;

  const getRandomPosition = () =>
    new Vector3(getRandomFloat(), -0.05, getRandomFloat());

  return (
    <group>
      {allTextures.map((texture, outerIndex) => {
        return (
          <React.Fragment key={outerIndex}>
            {Array.from({ length: 8 }).map((_, index) => (
              <mesh
                key={index}
                rotation={[-Math.PI / 2, 0, getRandomRotation()]}
                position={getRandomPosition()}
                receiveShadow
              >
                <planeGeometry args={[5, 5]} />
                <meshStandardMaterial
                  attach="material"
                  map={texture}
                  side={DoubleSide}
                  transparent
                />
              </mesh>
            ))}
          </React.Fragment>
        );
      })}
    </group>
  );
};

export default React.memo(Stickers);
