import { style } from "@/styles/variables";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";
import { RoundedBox, Text3D } from "@react-three/drei";
import React, { useRef, useState } from "react";

const StartGameButton = () =>
  // { onClick }: { onClick: any }
  {
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
          position={[-4.5, 0.5, 0]}
          // onClick={onClick}
        >
          {/* <boxGeometry args={[4, 2, 0.2, 32, 32]} />
          <meshBasicMaterial color={hovered ? "#2D4D10" : "#89ECB6"} /> */}
          <RoundedBox args={[5, 2.5, 0.5]} radius={0.3}>
            <meshLambertMaterial
              attach="material"
              color={hovered ? "#89ECB6" : "#4C831B"}
            />
          </RoundedBox>
        </mesh>
        <mesh
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          position={[-5, 0.7, -2.2]}
        >
          <Text3D font={style.START_FONT} letterSpacing={0.8} size={0.8}>
            START
            <meshLambertMaterial color={hovered ? "#CBFFE6" : "#89ECB6"} />
          </Text3D>
        </mesh>
      </group>
    );
  };

export default StartGameButton;
