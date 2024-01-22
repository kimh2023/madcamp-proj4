import { useTexture } from "@react-three/drei";
import { DoubleSide, RepeatWrapping } from "three";

const Arrow = () => {
  const texture = useTexture(`${process.env.FRONTEND_URL}/images/arrow.png`);
  texture.repeat.set(1, 1);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  console.log(texture);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
};
export default Arrow;
