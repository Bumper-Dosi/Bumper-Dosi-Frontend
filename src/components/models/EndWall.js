import React from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { useBox } from "@react-three/cannon";
import { CircleGeometry } from "three";

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
          color="#8418ca"
          reflectivity={0.2}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>
    </>
  );
}

export default EndWall;
