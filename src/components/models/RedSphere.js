import React from "react";
import { useSphere } from "@react-three/cannon";

function Sphere({ ...props }) {
  const [sphere] = useSphere(() => ({
    mass: 1,
    ...props,
  }));

  return (
    <>
      <mesh castShadow ref={sphere}>
        <sphereGeometry />
        <meshPhysicalMaterial color="red" />
      </mesh>
    </>
  );
}

export default Sphere;
