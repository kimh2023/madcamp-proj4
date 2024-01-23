import { GroupProps } from "@react-three/fiber";
import Arrow from "../terrain/Arrow";
import { TodoItemDto } from "@/types/TodoDto";
import TodoRabbit from "../models/TodoRabbit";
import { Text } from "@react-three/drei";
import StartGameButton from "../models/StartGameButton";

interface TodoProps extends GroupProps {
  index: number;
  todoItem: TodoItemDto;
}

const Todo = ({ index, todoItem, ...props }: TodoProps) => {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[6, 6, 0.5, 64]} />
        <meshBasicMaterial color={"#F68C9C"} />
      </mesh>
      <StartGameButton />
      <Arrow index={index} />
      <TodoRabbit
        animation={todoItem.animation}
        position={[1, 0.2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[-8, 0, 0]}
        font="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff"
      >
        {index}. {todoItem.task}
      </Text>
    </group>
  );
};
export default Todo;
