import { style } from "@/styles/variables";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";
import { RoundedBox, Text3D } from "@react-three/drei";
import React, { useRef, useState } from "react";

const StartGameButton = ({ setChosenTodo }: { setChosenTodo: () => void }) => {
  const buttonRef = useRef(null);
  const [hovered, setHover] = useState(false);

  return (
    <group>
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
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[-4.3, 0.5, 0]}
        onClick={() => {
          setChosenTodo();
          hoverLeave();
        }}
      >
        {/* <boxGeometry args={[4, 2, 0.2, 32, 32]} />
          <meshBasicMaterial color={hovered ? "#2D4D10" : "#89ECB6"} /> */}
        <RoundedBox args={[5, 2.5, 0.5]} radius={0.3}>
          <meshLambertMaterial
            attach="material"
            color={hovered ? "#89ECB6" : "#4C831B"}
          />
        </RoundedBox>
        <RoundedBox args={[5.1, 2.6, 0.2]} radius={0.1}>
          <meshLambertMaterial attach="material" color={"#eeeeee"} />
        </RoundedBox>
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[-4.8, 0.8, -2.1]}
      >
        <Text3D font={style.START_FONT} letterSpacing={0.95} size={0.8}>
          START
          <meshLambertMaterial color={hovered ? "#CBFFE6" : "#89ECB6"} />
        </Text3D>
      </mesh>
    </group>
  );
};

export default StartGameButton;
