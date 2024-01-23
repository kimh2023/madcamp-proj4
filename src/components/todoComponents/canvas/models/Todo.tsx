import { GroupProps } from "@react-three/fiber";
import Arrow from "./Arrow";

interface TodoProps extends GroupProps {
  index: number;
}

const Todo = ({ index, ...props }: TodoProps) => {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[6, 6, 0.5, 64]} />
        <meshBasicMaterial color={"#ABFAA9"} />
      </mesh>
      <Arrow index={index} />
    </group>
  );
};
export default Todo;
