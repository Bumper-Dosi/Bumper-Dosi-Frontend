import React from "react";
import { useBox } from "@react-three/cannon";

function EndWall({ args, rotation, ...props }) {
  const [box] = useBox(() => ({
    mass: 1,
    args,
    type: "Static",
    rotation,
    ...props,
  }));

  return (
    <>
      <mesh castShadow scale={args} ref={box}>
        <boxGeometry />
        <meshPhysicalMaterial
          color="#E281C7"
          reflectivity={0.5}
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>
    </>
  );
}

export default EndWall;
