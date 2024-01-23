import { GroupProps } from "@react-three/fiber";
import Arrow from "./Arrow";
import { TodoItemDto } from "@/types/TodoDto";
import TodoRabbit from "./TodoRabbit";
import { Text } from "@react-three/drei";

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
      <Arrow index={index} />
      <TodoRabbit animation={todoItem.animation} position={[0, 0.2, 0]} />
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 8]}
        font="https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff"
      >
        {index + 1}. {todoItem.task}
      </Text>
    </group>
  );
};
export default Todo;
