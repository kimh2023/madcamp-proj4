import { GroupProps } from "@react-three/fiber";
import Arrow from "../terrain/Arrow";
import { TodoItemDto } from "@/types/TodoDto";
import { Text } from "@react-three/drei";
import StartGameButton from "./StartGameButton";
import { style } from "@/styles/variables";
import NoRabbitTodo from "./NoRabbitTodo";

interface TodoProps extends GroupProps {
  isFriendsMap: boolean;
  index: number;
  todoItem: TodoItemDto;
  setChosenTodo: (chosenTodo: TodoItemDto) => void;
}

const Todo = ({
  isFriendsMap,
  index,
  todoItem,
  setChosenTodo,
  ...props
}: TodoProps) => {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[6, 6, 0.5, 64]} />
        <meshBasicMaterial color={style.DARK_PINK} />
      </mesh>
      {!isFriendsMap && (
        <StartGameButton setChosenTodo={() => setChosenTodo(todoItem)} />
      )}
      <Arrow index={index} />
      <NoRabbitTodo
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
