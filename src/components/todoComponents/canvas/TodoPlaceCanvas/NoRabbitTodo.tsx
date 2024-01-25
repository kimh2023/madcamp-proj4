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
        return "exercise.glb";
      case "STUDY":
        return "study.glb";
      case "CLEAN":
        return "clean.glb";
      case "WASH":
        return "wash.glb";
      case "HOMEWORK":
        return "homework.glb";
      default:
        return "rabbit.glb";
    }
  }, [animation]);

  const { scene } = useGLTF(`/models/norabbit/${loadedAnimation}`);

  return <Clone object={scene} {...props} />;
};

export default React.memo(NoRabbitTodo);
