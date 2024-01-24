import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { DoubleSide, RepeatWrapping } from "three";

const Terrain = ({ onClick, place }: { onClick?: any; place?: string }) => {
  const textureInfo = useMemo(() => {
    switch (place) {
      case "HOME":
        return { file: "paper-home.jpg", size: 600 };
      case "SCHOOL":
        return { file: "paper-school.jpg", size: 900 };
      default:
        return { file: "paper.jpg", size: 1000 };
    }
  }, [place]);

  const texture = useTexture(`/images/${textureInfo.file}`);
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
      <planeGeometry args={[textureInfo.size, textureInfo.size]} />
      <meshStandardMaterial attach="material" map={texture} side={DoubleSide} />
    </mesh>
  );
};
export default Terrain;
