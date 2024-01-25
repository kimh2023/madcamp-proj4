import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps, useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

interface FriendRabbitProps extends GroupProps {
  isWalking: boolean;
  lookAtDirection: THREE.Vector3;
}

const Rabbit = ({
  isWalking,
  lookAtDirection,
  ...props
}: FriendRabbitProps) => {
  const group = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
  const { scene, materials, animations } = useGLTF("/models/rabbit/rabbit.glb");
  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState("");

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.1).play();
    return (): void => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

  useFrame(() => {
    if (isWalking) {
      setAnimation("walk");
    } else {
      setAnimation("");
    }
  });

  useEffect(() => {
    if (group.current) {
      group.current.lookAt(lookAtDirection);
    }
  }, [lookAtDirection]);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  if (!nodes) {
    return <></>;
  }

  return (
    <group ref={group} {...props} dispose={null}>
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
              material={materials.grey}
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
