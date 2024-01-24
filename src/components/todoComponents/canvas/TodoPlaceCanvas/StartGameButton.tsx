import { style } from "@/styles/variables";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";
import { Center, RoundedBox, Text3D } from "@react-three/drei";
import React, { useRef, useState } from "react";

const StartGameButton = ({ setChosenTodo }: { setChosenTodo: () => void }) => {
  const buttonRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const buttonThickness = 0.7;
  const buttonWidth = 5;
  const buttonHeight = 2;

  return (
    <group position={[-4, 0.5, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
      <mesh
        ref={buttonRef}
        onPointerOver={() => {
          hoverEnter();
          setHover(true);
        }}
        onPointerOut={() => {
          hoverLeave();
          setHover(false);
        }}
        onClick={() => {
          setChosenTodo();
          hoverLeave();
        }}
      >
        <RoundedBox
          args={[buttonWidth, buttonHeight, buttonThickness]}
          radius={0.3}
        >
          <meshStandardMaterial
            attach="material"
            color={hovered ? style.GREEN_1 : style.GREEN_2}
          />
        </RoundedBox>
      </mesh>
      <mesh position={[0, 0, -0.2]}>
        <RoundedBox
          args={[buttonWidth + 0.2, buttonHeight + 0.2, buttonThickness]}
          radius={0.3}
        >
          <meshStandardMaterial attach="material" color={"#eeeeee"} />
        </RoundedBox>
      </mesh>
      <mesh position={[0, 0, 0.1 + buttonThickness / 2]}>
        <Center>
          <Text3D
            font={style.START_FONT}
            letterSpacing={0.9}
            size={0.7}
            height={buttonThickness / 3}
          >
            START
            <meshStandardMaterial
              color={hovered ? style.GREEN_0 : style.GREEN_1}
            />
          </Text3D>
        </Center>
      </mesh>
    </group>
  );
};

export default StartGameButton;
