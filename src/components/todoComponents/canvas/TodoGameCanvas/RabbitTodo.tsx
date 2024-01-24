import React, { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";
import * as THREE from "three";

interface NoRabbitTodoProps extends MeshProps {
  animation: string;
}

const RabbitTodo = ({ animation, ...props }: NoRabbitTodoProps) => {
  const mesh =
    useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>(
      null,
    );
  const loadedAnimation = useMemo(() => {
    switch (animation) {
      case "EXERCISE":
        return {
          file: "rabbit-exercising.glb",
          animation: ["Cylinder.003Action", "CylinderAction", "metarigAction"],
        };
      default:
        return { file: "rabbit.glb", animation: ["walk"] };
    }
  }, [animation]);

  const { scene, animations } = useGLTF(`/models/${loadedAnimation.file}`);
  const { actions } = useAnimations(animations, mesh);
  console.log(actions);

  useEffect(() => {
    loadedAnimation.animation.forEach((animationKey) => {
      actions[animationKey]?.reset().fadeIn(0.1).play();
    });
    return (): void => {
      loadedAnimation.animation.forEach((animationKey) => {
        actions[animationKey]?.fadeOut(0.5);
      });
    };
  }, [loadedAnimation.animation, actions]);

  return (
    // <Clone
    //   ref={mesh}
    //   object={scene}
    //   {...props}
    //   onPointerOver={hoverEnter}
    //   onPointerLeave={hoverLeave}
    // />
    <mesh
      ref={mesh}
      {...props}
      onPointerOver={hoverEnter}
      onPointerLeave={hoverLeave}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default React.memo(RabbitTodo);
