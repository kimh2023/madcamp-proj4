const Road = () => {
  const roadWidth = 10;
  const roadLength = 1000;
  const roadSiderWidth = 0.5;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <mesh position={[-roadWidth / 2 - roadSiderWidth / 2, 0, 0]}>
        <boxGeometry args={[roadSiderWidth, roadLength, roadWidth / 5]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      <mesh>
        <boxGeometry args={[roadWidth, roadLength, roadWidth / 7]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[roadWidth / 2 + roadSiderWidth / 2, 0, 0]}>
        <boxGeometry args={[roadSiderWidth, roadLength, roadWidth / 5]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>
      {Array.from({ length: 50 }, (_, index) => (
        <mesh
          key={index}
          position={[0, -roadLength / 2 + index * roadWidth * 1.5, 0]}
        >
          <boxGeometry args={[roadWidth / 30, roadWidth / 2, roadWidth / 5]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>
      ))}
    </group>
  );
};

export default Road;
