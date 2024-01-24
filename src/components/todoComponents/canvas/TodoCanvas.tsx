import { ThreeEvent } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Vector3 } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Road from "./TodoCanvas/Road";
import School from "./TodoCanvas/School";
import Terrain from "./terrain/Terrain";
import House from "./TodoCanvas/House";
import { hoverEnter, hoverLeave } from "@/utils/hoverHandler";
import Rabbit from "./models/Rabbit";

const TodoCanvas = ({
  setPlace,
}: {
  setPlace: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [rabbitPosition, setRabbitPosition] = useState<Vector3>(
    new Vector3(0, 0, 0),
  );

  const handleCanvasClick = (event: ThreeEvent<MouseEvent>) => {
    const x = Math.max(-4.5, Math.min(4.5, event.point.x));
    setRabbitPosition(new Vector3(x, 0, event.point.z));
  };

  return (
    <React.Fragment>
      <PerspectiveCamera
        makeDefault
        rotation={[-0.15, 0.9, 0.15]}
        position={[30, 15, 27]}
      />
      <OrbitControls />

      <Rabbit isMain={true} position={rabbitPosition} rotation={[0, 0, 0]} />
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
