import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshProps, useFrame } from "@react-three/fiber";

interface RabbitProps extends MeshProps {}

const Rabbit = ({ ...props }: RabbitProps) => {
  const model = useGLTF(`${process.env.FRONTEND_URL}/models/rabbit8.glb`);
  const mesh =
    useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>(
      null,
    );
  const [animation, setAnimation] = useState("walk");
  const position = useMemo(() => props.position, []);
  const { actions } = useAnimations(model.animations, mesh);

  const modelAnimations = model.animations;
  console.log(modelAnimations);
  const mixer = new THREE.AnimationMixer(model.scene);

  model.animations.forEach((clip) => {
    if (clip.name === "walk1") {
      const action = mixer.clipAction(clip);
      action.play();
    }
  });

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
      setAnimation("walk2");
    } else {
      setAnimation("");
    }
  });

  return (
    <mesh ref={mesh} {...props} position={position}>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default Rabbit;
