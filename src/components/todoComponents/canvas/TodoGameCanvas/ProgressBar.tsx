import { style } from "@/styles/variables";
import { RoundedBox } from "@react-three/drei";
import { Carrot } from "../models/Carrot";

const ProgressBar = ({ progress }: { progress: number }) => {
  const HPLength = 15;
  const HPThickness = 0.8;

  const boxWidth = HPLength - 0.3;
  const progressBarWidth = boxWidth * progress;

  return (
    <group
      position={[-4.3, 8, 0]}
      rotation={[Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
    >
      <mesh>
        <RoundedBox args={[HPLength, HPThickness, 0.2]} radius={0.1}>
          <meshStandardMaterial attach="material" color={style.LIGHT_GREY} />
        </RoundedBox>
      </mesh>
      <mesh position={[-(boxWidth - progressBarWidth) / 2, 0, -0.05]}>
        <RoundedBox
          args={[progressBarWidth, HPThickness * 0.7, 0.2]}
          radius={0.1}
        >
          <meshStandardMaterial attach="material" color={style.DARK_PINK} />
        </RoundedBox>
        <Carrot
          rotation={[Math.PI / 2, -Math.PI / 2 + 0.2, -Math.PI / 2]}
          position={[progressBarWidth / 2, 0.7, 0]}
          scale={0.5}
        />
      </mesh>
    </group>
  );
};
export default ProgressBar;
