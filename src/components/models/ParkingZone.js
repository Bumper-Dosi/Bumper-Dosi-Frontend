import React, { useState } from "react";
import { usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import ReadyTrigger from "../models/ReadyTrigger";
import CancelTrigger from "../models/CancelTrigger";

function ParkingZone({ size, position, startGameFn, ...props }) {
  const [isReady, setIsReady] = useState(false);
  const [ref, api] = usePlane(() => ({
    type: "Static",
    material: "ground",
    mass: 0,
    position,
    ...props,
  }));
  const afterPosition = [position[0], position[1], position[2] + 4];

  useFrame(() => {
    isReady &&
      setTimeout(() => {
        api.position.set(position[0], position[1] + 2, position[2]);
        setTimeout(() => {
          api.position.set(position[0], position[1], position[2]);
          setIsReady(false);
          startGameFn();
        }, 0);
      }, 2000);
  });

  return (
    <>
      {!isReady ? (
        <ReadyTrigger
          onCollide={(e) => {
            setTimeout(() => {
              setIsReady(true);
            }, 1000);
          }}
          position={position}
          size={[7, 5, 7]}
        />
      ) : (
        <CancelTrigger
          onCollide={(e) => {
            setTimeout(() => {
              setIsReady(false);
            }, 1000);
          }}
          position={afterPosition}
          size={[7, 5, 1]}
        />
      )}
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
    </>
  );
}

export default ParkingZone;
