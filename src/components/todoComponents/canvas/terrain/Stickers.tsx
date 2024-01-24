import { useTexture } from "@react-three/drei";
import React, { useEffect, useState } from "react";
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

  const [positions, setPositions] = useState<Vector3[]>([]);

  useEffect(() => {
    const stickers: Vector3[] = [];
    const maxStickers = 8 * 5;

    while (stickers.length < maxStickers) {
      const newPosition = getRandomPosition();
      const isOverlapping = stickers.some((sticker) => {
        const distance = sticker.distanceTo(newPosition);
        return distance < 5;
      });

      if (!isOverlapping) {
        stickers.push(newPosition);
      }
      setPositions(stickers);
    }
  }, []);

  if (positions.length < 40) {
    return <></>;
  }

  return (
    <group>
      {allTextures.map((texture, outerIndex) => {
        return (
          <React.Fragment key={outerIndex}>
            {Array.from({ length: 8 }).map((_, index) => (
              <mesh
                key={index}
                rotation={[-Math.PI / 2, 0, getRandomRotation()]}
                position={positions[(outerIndex + 1) * 8 + index - 1]}
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
