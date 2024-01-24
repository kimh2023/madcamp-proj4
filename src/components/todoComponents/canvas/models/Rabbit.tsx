import React, { useEffect, useMemo, useRef, useState } from "react";
import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps, useFrame, useGraph } from "@react-three/fiber";
import { useAudio } from "@/utils/useAudio";
import GoOutArrow from "../TodoPlaceCanvas/GoOutArrow";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";
import { SkeletonUtils } from "three-stdlib";
import { io } from "socket.io-client";

interface RabbitProps extends GroupProps {
  place?: string;
  isMain?: boolean;
  goOut?: () => void;
}

const socket = io(
  process.env.BACKEND_URL ? process.env.BACKEND_URL : "http://localhost:3000",
  { withCredentials: true },
);

const Rabbit = ({ place, isMain, goOut, ...props }: RabbitProps) => {
  const group = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
  const { scene, materials, animations } = useGLTF("/models/rabbit/rabbit.glb");
  const { actions } = useAnimations(animations, group);

  // const model = useGLTF(`/models/rabbit/rabbit.glb`);
  // const mesh =
  //   useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>(
  //     null,
  //   );
  const [animation, setAnimation] = useState("");
  const position = useMemo(() => props.position, []);
  // const { actions } = useAnimations(model.animations, mesh);

  const { playing, toggle } = useAudio("/sounds/walk.mp3");

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.1).play();
    return (): void => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

  useFrame(() => {
    if (
      group?.current &&
      group?.current.position.distanceTo(props.position as THREE.Vector3) > 0.1
    ) {
      const direction = group.current.position
        .clone()
        .sub(props.position as THREE.Vector3)
        .normalize()
        .multiplyScalar(0.1);
      group.current.position.sub(direction);
      group.current.lookAt(props.position as THREE.Vector3);
      console.log("DIRECTION", group.current.getWorldDirection(direction));
      socket.emit("location", {
        position: group.current.position,
        direction: {
          x: group.current.getWorldDirection(direction).x,
          y: 0,
          z: group.current.getWorldDirection(direction).z,
        },
        place: place ? place : "MAIN",
      });

      setAnimation("walk");
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

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  if (!nodes) {
    return <></>;
  }
  console.log(materials);

  return (
    <group ref={group} {...props} position={position} dispose={null}>
      {place !== undefined && isMain && (
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
      <group name="Scene">
        <group name="metarig">
          <group name="rabbit">
            <skinnedMesh
              name="Sphere004"
              geometry={(nodes?.Sphere004 as any)?.geometry}
              material={materials.pink}
              skeleton={(nodes?.Sphere004 as any)?.skeleton}
            />
            <skinnedMesh
              name="Sphere004_1"
              geometry={(nodes?.Sphere004_1 as any)?.geometry}
              material={isMain ? materials.white : materials.grey}
              skeleton={(nodes?.Sphere004_1 as any)?.skeleton}
            />
            <skinnedMesh
              name="Sphere004_2"
              geometry={(nodes?.Sphere004_2 as any)?.geometry}
              material={materials.black}
              skeleton={(nodes?.Sphere004_2 as any)?.skeleton}
            />
          </group>
          <primitive object={nodes.spine} />
          <primitive object={nodes.neutral_bone} />
        </group>
      </group>
    </group>
  );
};

export default React.memo(Rabbit);
