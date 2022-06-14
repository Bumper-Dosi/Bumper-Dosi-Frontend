import React from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { useBox } from "@react-three/cannon";

function EndWall({ args, rotation, ...props }) {
  const [box] = useBox(() => ({
    mass: 1,
    args,
    type: "Static",
    rotation,
    ...props,
  }));
  useHelper(box, BoxHelper, "red");

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
