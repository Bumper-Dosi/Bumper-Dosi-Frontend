import { useBox } from "@react-three/cannon";

function CancelTrigger({ onCollide, size, position }) {
  const [ref] = useBox(() => ({
    isTrigger: true,
    args: size,
    position,
    onCollide,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial wireframe color="green" />
      {/* <meshPhongMaterial color="#ff0000" opacity={0} transparent /> */}
    </mesh>
  );
}

export default CancelTrigger;
