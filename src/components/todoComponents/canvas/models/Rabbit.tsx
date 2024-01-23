import React, { useEffect, useMemo, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshProps, useFrame } from "@react-three/fiber";

interface RabbitProps extends MeshProps {
  mesh: React.RefObject<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    >
  >;
}

const Rabbit = ({ mesh, ...props }: RabbitProps) => {
  const model = useGLTF(`${process.env.FRONTEND_URL}/models/rabbit.glb`);
  const [animation, setAnimation] = useState("");
  const position = useMemo(() => props.position, []);
  const { actions } = useAnimations(model.animations, mesh);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
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
      console.log(actions);
    } else {
      setAnimation("");
    }
  });

  useEffect(() =>
    model.scene.traverse((child) => {
      if (child.isObject3D) {
        child.castShadow == true;
      }
    }),
  );

  return (
    <mesh ref={mesh} {...props} position={position} castShadow>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default Rabbit;
