import React from "react";
import { usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

function ParkingZone({ isReady, setIsReady, size, position, ...props }) {
  const [ref, api] = usePlane(() => ({
    type: "Static",
    material: "ground",
    mass: 0,
    position,
    ...props,
  }));

  useFrame(() => {
    isReady &&
      setTimeout(() => {
        api.position.set(position[0], position[1] + 2, position[2]);
        setTimeout(() => {
          api.position.set(position[0], position[1], position[2]);
          setIsReady(false);
        }, 0);
      }, 2000);
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[7, 7]} />
        <meshPhysicalMaterial color={!isReady ? "yellow" : "red"} />
      </mesh>
      <mesh>
        <boxGeometry args={[7 * 0.7, 7 * 0.7]} />
        <meshPhysicalMaterial color="black" />
      </mesh>
    </group>
  );
}
export default ParkingZone;
