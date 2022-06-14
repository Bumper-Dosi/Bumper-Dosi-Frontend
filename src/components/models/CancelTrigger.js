import { useBox } from "@react-three/cannon";

function CancelTrigger({ onCollide, onCollideBegin, size, position }) {
  const [ref] = useBox(() => ({
    isTrigger: true,
    args: size,
    position,
    onCollide,
    onCollideBegin,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={size} />
      <meshPhongMaterial color="#ff0000" opacity={0} transparent />
    </mesh>
  );
}

export default CancelTrigger;
