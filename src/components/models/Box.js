import { useBox } from "@react-three/cannon";

function Box({ ...props }) {
  const [box] = useBox(() => ({
    type: "Dynamic",
    mass: 6,
    ...props,
  }));

  return (
    <mesh castShadow ref={box} scale={[2, 1, 2]}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="beige" />
    </mesh>
  );
}

export default Box;
