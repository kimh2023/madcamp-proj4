import { ThreeEvent } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Vector3 } from "three";
import { TodoItemDto } from "@/types/TodoDto";
import Todo from "./TodoPlaceCanvas/Todo";
import Terrain from "./terrain/Terrain";
import Stickers from "./terrain/Stickers";
import Arrow from "./terrain/Arrow";
import Rabbit from "./models/Rabbit";

const TodoPlaceCanvas = ({
  todoListState,
  place,
  setPlace,
  setChosenTodo,
}: {
  todoListState: TodoItemDto[];
  place?: string;
  setPlace: Dispatch<SetStateAction<string | undefined>>;
  setChosenTodo: (chosenTodo: TodoItemDto) => void;
}) => {
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 0),
  );
  const currentTodo = useMemo(
    () =>
      todoListState.filter(
        (todoItem) => todoItem.completed_in_progress !== "COMPLETE",
      ),
    [todoListState],
  );
  console.log(currentTodo);

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    setRabbitPosition(new Vector3(event.point.x, 0, event.point.z));
  };

  return (
    <React.Fragment>
      <Rabbit
        place={place}
        isMain={true}
        goOut={() => setPlace(undefined)}
        position={rabbitPosition}
        rotation={[0, 0, 0]}
        onClick={() => console.log("hi")}
      />
      <Rabbit
        place={place}
        goOut={() => setPlace(undefined)}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        onClick={() => console.log("hi")}
      />
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[6, 6, 0.5, 64]} />
        <meshBasicMaterial color={"#F68C9C"} />
      </mesh>
      <Arrow index={0} />
      <React.Fragment>
        {currentTodo.map((todoItem, index) => (
          <Todo
            key={index}
            index={index + 1}
            todoItem={todoItem}
            setChosenTodo={setChosenTodo}
            position={[(index + 1) * 30, 0, 40 * ((index + 1) % 2)]}
          />
        ))}
      </React.Fragment>
      <Terrain onClick={handleCanvasClick} place={place} />
      <Stickers />
    </React.Fragment>
  );
};

export default TodoPlaceCanvas;
