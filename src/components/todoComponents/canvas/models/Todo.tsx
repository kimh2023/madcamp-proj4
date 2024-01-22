import { GroupProps } from "@react-three/fiber";

const Todo = (props: GroupProps) => {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[6, 6, 0.5, 64]} />
        <meshBasicMaterial color={"#ABFAA9"} />
      </mesh>
    </group>
  );
};
export default Todo;
