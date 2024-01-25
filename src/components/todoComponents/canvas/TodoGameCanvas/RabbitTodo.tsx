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
          file: "exercise.glb",
          animation: ["Cylinder.003Action", "CylinderAction", "metarigAction"],
          position: new THREE.Vector3(0, 1.5, 1),
        };
      case "STUDY":
        return {
          file: "study.glb",
          animation: ["metarigAction", "lidAction"],
          position: new THREE.Vector3(0, 2, 3),
        };
      case "CLEAN":
        return {
          file: "clean.glb",
          animation: ["microfiber-mopAction.031", "study.002", "TriggerAction"],
          position: new THREE.Vector3(0, 2, 2),
        };
      case "WASH":
        return {
          file: "wash.glb",
          animation: ["study.001"],
          position: new THREE.Vector3(0, 1.5, 1.5),
        };
      case "HOMEWORK":
        return {
          file: "homework.glb",
          animation: ["study.001"],
          position: new THREE.Vector3(0, -1, -1),
        };
      default:
        return {
          file: "rabbit.glb",
          animation: ["walk"],
          position: new THREE.Vector3(0, 0, 0),
        };
    }
  }, [animation]);

  const { scene, animations } = useGLTF(
    `/models/rabbit/${loadedAnimation.file}`,
  );
  const { actions } = useAnimations(animations, mesh);

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
    <mesh
      ref={mesh}
      {...props}
      onPointerOver={hoverEnter}
      onPointerLeave={hoverLeave}
      position={loadedAnimation.position}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default React.memo(RabbitTodo);
