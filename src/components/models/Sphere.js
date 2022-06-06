import React from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { useSphere } from "@react-three/cannon";

function Sphere({ ...props }) {
  const [sphere] = useSphere(() => ({ mass: 1, ...props }));
  useHelper(sphere, BoxHelper, "red"); // 3d모델의 크기를 알게 표시해주는 헬퍼

  return (
    <>
      <mesh castShadow ref={sphere}>
        <sphereGeometry />
        <meshPhysicalMaterial color="yellow" />
      </mesh>
    </>
  );
}

export default Sphere;
