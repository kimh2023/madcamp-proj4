import React, { useEffect, useMemo, useRef, useState } from "react";
import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useAudio } from "@/utils/useAudio";
import GoOutArrow from "../TodoPlaceCanvas/GoOutArrow";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";

interface RabbitProps extends MeshProps {
  isPlace: boolean;
  goOut?: () => void;
}

const Rabbit = ({ isPlace, goOut, ...props }: RabbitProps) => {
  const model = useGLTF(`/models/rabbit.glb`);
  const mesh =
    useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>(
      null,
    );
  const [animation, setAnimation] = useState("");
  const position = useMemo(() => props.position, []);
  const { actions } = useAnimations(model.animations, mesh);

  const { playing, toggle } = useAudio("/sounds/walk.mp3");

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.1).play();
    return (): void => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

  useFrame(() => {
    if (
      mesh?.current &&
      mesh?.current.position.distanceTo(props.position as THREE.Vector3) > 0.1
    ) {
      const direction = mesh.current.position
        .clone()
        .sub(props.position as THREE.Vector3)
        .normalize()
        .multiplyScalar(0.1);
      mesh.current.position.sub(direction);
      mesh.current.lookAt(props.position as THREE.Vector3);
      setAnimation("walk");
      // console.log(actions);
      if (!playing) {
        toggle();
      }
    } else {
      setAnimation("");
      if (playing) {
        toggle();
      }
    }
  });

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <mesh ref={mesh} {...props} position={position} castShadow>
      {isPlace && (
        <React.Fragment>
          {/* <PerspectiveCamera
            makeDefault
            rotation={[-Math.PI / 2 + 0.8, 0, 0]}
            position={[0, 20, 25]}
          /> */}
          <PerspectiveCamera
            makeDefault
            rotation={[0.7, Math.PI, 0]}
            position={[0, 16, -15]}
            far={100}
          />
          <GoOutArrow
            // rotation={[Math.PI / 2 + 0.8, 0.5, 0]}
            // position={[-innerWidth / 60, 0, -15]}
            rotation={[Math.PI / 2, -0.5, -0.5]}
            position={[12, 3, 17]}
            onPointerEnter={hoverEnter}
            onPointerLeave={hoverLeave}
            onClick={() => {
              goOut && goOut();
              hoverLeave();
            }}
          />
        </React.Fragment>
      )}
      <primitive object={model.scene} />
    </mesh>
  );
};
export default Rabbit;
