import React, { useMemo } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

interface NoRabbitTodoProps extends GroupProps {
  animation: string;
}

const NoRabbitTodo = ({ animation, ...props }: NoRabbitTodoProps) => {
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

  return <Clone object={scene} {...props} />;
};

export default React.memo(NoRabbitTodo);
