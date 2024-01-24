import { style } from "@/styles/variables";
import { Center, Text3D } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Carrot } from "../models/Carrot";

const CompleteMessage = () => {
  const [carrots, setCarrots] = useState(
    Array(20)
      .fill(undefined)
      .map(() => ({
        x: Math.random() * 20 - 10,
        y: Math.random() * (12 - 4 + 1) + 4,
        z: Math.random() * 2 - 1,
        rot: Math.random() * Math.PI,
      })),
  );

  useEffect(() => {
    const updateCarrots = () => {
      setCarrots((prevCarrots) =>
        prevCarrots.map((carrot) => ({
          ...carrot,
          y:
            carrot.y - 0.1 > -20
              ? carrot.y - 0.1
              : Math.random() * (12 - 5 + 1) + 5,
          rot: carrot.rot + 0.02,
        })),
      );
    };

    const animationId = setInterval(updateCarrots, 50); // Adjust the interval as needed

    return () => clearInterval(animationId);
  }, []);

  return (
    <group position={[0, 8, -2]} rotation={[-0.2, 0, 0]}>
      <mesh>
        <Center>
          <Text3D font={style.START_FONT} letterSpacing={0.95} size={0.8}>
            COMPLETE!
            <meshStandardMaterial color={style.GREEN_2} />
          </Text3D>
        </Center>
      </mesh>
      {carrots.map((carrot, index) => (
        <Carrot
          key={index}
          rotation={[carrot.rot, 0, carrot.rot]}
          position={[carrot.x, carrot.y + index * 0.5, carrot.z]}
          scale={0.5}
        />
      ))}
    </group>
  );
};
export default CompleteMessage;
