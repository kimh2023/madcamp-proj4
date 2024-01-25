import { ThreeEvent } from "@react-three/fiber";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Vector3 } from "three";
import { TodoItemDto } from "@/types/TodoDto";
import Todo from "./TodoPlaceCanvas/Todo";
import Terrain from "./terrain/Terrain";
import Stickers from "./terrain/Stickers";
import Arrow from "./terrain/Arrow";
import Rabbit from "./models/Rabbit";
import { LocationDto, MultipleLocationsDto } from "@/types/LocationDto";
import { Socket } from "socket.io-client";
import FriendRabbit from "./models/FriendRabbit";

const TodoPlaceCanvas = ({
  socket,
  isFriendsMap,
  todoListState,
  place,
  setPlace,
  setChosenTodo,
}: {
  socket: Socket<any, any>;
  isFriendsMap: boolean;
  todoListState: TodoItemDto[];
  place?: string;
  setPlace: Dispatch<SetStateAction<string | undefined>>;
  setChosenTodo: (chosenTodo: TodoItemDto) => void;
}) => {
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 0),
  );
  const [otherRabbitInfo, setOtherRabbitInfo] = useState<MultipleLocationsDto>(
    {},
  );
  const [myUserInfo, setMyUserInfo] = useState(0);
  const currentTodo = useMemo(() => todoListState, [todoListState]);
  // const currentTodo = useMemo(
  //   () =>
  //     todoListState.filter(
  //       (todoItem) => todoItem.completed_in_progress !== "COMPLETE",
  //     ),
  //   [todoListState],
  // );

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    setRabbitPosition(new Vector3(event.point.x, 0, event.point.z));
  };

  useEffect(() => {
    socket.on("characterLocation", (locationData: LocationDto) => {
      setOtherRabbitInfo((prevState) => ({
        ...prevState,
        [locationData.user]: locationData,
      }));
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("userInfo");
    socket.on("userInfoReturn", ({ user }: { user: number }) => {
      setMyUserInfo(user);
      console.log(user);
    });
  }, [socket]);

  return (
    <React.Fragment>
      <Rabbit
        place={place}
        goOut={() => setPlace(undefined)}
        position={rabbitPosition}
        rotation={[0, 0, 0]}
        onClick={() => console.log("hi")}
      />
      {Object.keys(otherRabbitInfo).map((id) => (
        <React.Fragment key={id}>
          {otherRabbitInfo[Number(id)].place === place &&
            Number(id) !== myUserInfo && (
              <FriendRabbit
                isWalking={otherRabbitInfo[Number(id)].isWalking}
                position={
                  new Vector3(
                    otherRabbitInfo[Number(id)].position.x,
                    0,
                    otherRabbitInfo[Number(id)].position.z,
                  )
                }
                lookAtDirection={
                  new Vector3(
                    otherRabbitInfo[Number(id)].direction.x,
                    0,
                    otherRabbitInfo[Number(id)].direction.z,
                  )
                }
              />
            )}
        </React.Fragment>
      ))}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[6, 6, 0.5, 64]} />
        <meshBasicMaterial color={"#F68C9C"} />
      </mesh>
      <Arrow index={0} />
      <React.Fragment>
        {currentTodo.map((todoItem, index) => (
          <Todo
            key={index}
            isFriendsMap={isFriendsMap}
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
