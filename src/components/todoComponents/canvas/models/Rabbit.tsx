import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MeshProps, useFrame } from "@react-three/fiber";

interface RabbitProps extends MeshProps {}

const Rabbit = ({ ...props }: RabbitProps) => {
  const model = useGLTF(`${process.env.FRONTEND_URL}/models/rabbit8.glb`);
  const modelAnimations = model.animations;
  console.log(modelAnimations);
  const mixer = new THREE.AnimationMixer(model.scene);

  model.animations.forEach((clip) => {
    if (clip.name === "walk1" || clip.name === "walk2") {
      const action = mixer.clipAction(clip);
      action.play();
      console.log(clip);
    }
  });

  useFrame((state, delta) => {
    mixer?.update(delta);
  });

  return (
    <mesh {...props}>
      <primitive object={model.scene} />
    </mesh>
  );
};
export default Rabbit;
