import React, { useMemo, useRef } from "react";
import { Clone, useAnimations, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";

interface TodoRabbitProps extends GroupProps {
  animation: string;
}

const TodoRabbit = ({ animation, ...props }: TodoRabbitProps) => {
  const loadedAnimation = useMemo(() => {
    switch (animation) {
      case "EXERCISE":
        return "no-rabbit-exercising.glb";
      default:
        return "rabbit.glb";
    }
  }, [animation]);
  console.log(animation);

  const { scene, animations } = useGLTF(
    `${process.env.FRONTEND_URL}/models/${loadedAnimation}`,
  );
  const group = useRef<Group<Object3DEventMap>>(null);
  const { actions } = useAnimations(animations, group);

  return <Clone object={scene} {...props} />;
};

export default React.memo(TodoRabbit);
