import { useTexture } from "@react-three/drei";
import { DoubleSide, RepeatWrapping } from "three";

const Terrain = ({ onClick }: { onClick?: any }) => {
  const texture = useTexture(`${process.env.FRONTEND_URL}/images/paper.jpg`);
  texture.repeat.set(50, 50);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.2, 0]}
      onClick={onClick}
      receiveShadow
    >
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial attach="material" map={texture} side={DoubleSide} />
    </mesh>
  );
};
export default Terrain;
