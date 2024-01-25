import { ThreeEvent } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Vector3 } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Road from "./TodoCanvas/Road";
import School from "./TodoCanvas/School";
import Terrain from "./terrain/Terrain";
import House from "./TodoCanvas/House";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";
import Rabbit from "./models/Rabbit";
import { Socket } from "socket.io-client";
import { LocationDto, MultipleLocationsDto } from "@/types/LocationDto";
import FriendRabbit from "./models/FriendRabbit";

const TodoCanvas = ({
  setPlace,
  socket,
}: {
  setPlace: Dispatch<SetStateAction<string | undefined>>;
  socket: Socket<any, any>;
}) => {
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 0),
  );
  const [otherRabbitInfo, setOtherRabbitInfo] = useState<MultipleLocationsDto>(
    {},
  );
  const [myUserInfo, setMyUserInfo] = useState(0);

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    const x = Math.max(-4.5, Math.min(4.5, event.point.x));
    setRabbitPosition(new Vector3(x, 0, event.point.z));
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
      <PerspectiveCamera
        makeDefault
        rotation={[-0.15, 0.9, 0.15]}
        position={[30, 15, 27]}
      />
      <OrbitControls />

      <Rabbit position={rabbitPosition} rotation={[0, 0, 0]} />

      {Object.keys(otherRabbitInfo).map((id) => (
        <React.Fragment key={id}>
          {otherRabbitInfo[Number(id)].place === "MAIN" &&
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

      <Road />
      <School
        position={[-16, -1, -25]}
        onPointerEnter={hoverEnter}
        onPointerLeave={hoverLeave}
        onClick={() => {
          setPlace("SCHOOL");
          hoverLeave();
        }}
      />
      <House
        position={[-20, -1, 10]}
        onPointerEnter={hoverEnter}
        onPointerLeave={hoverLeave}
        onClick={() => {
          setPlace("HOME");
          hoverLeave();
        }}
      />

      <Terrain onClick={handleCanvasClick} />
    </React.Fragment>
  );
};

export default TodoCanvas;
