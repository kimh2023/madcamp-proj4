import React, { useMemo } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";

interface NoRabbitTodoProps extends GroupProps {
  animation: string;
  // onClick:
}

const RabbitTodo = ({ animation, ...props }: NoRabbitTodoProps) => {
  const loadedAnimation = useMemo(() => {
    switch (animation) {
      case "EXERCISE":
        return "rabbit-exercising.glb";
      default:
        return "rabbit.glb";
    }
  }, [animation]);
  console.log(animation);

  const { scene, animations } = useGLTF(`/models/${loadedAnimation}`);

  return (
    <Clone
      object={scene}
      {...props}
      onPointerOver={hoverEnter}
      onPointerLeave={hoverLeave}
    />
  );
};

export default React.memo(RabbitTodo);
