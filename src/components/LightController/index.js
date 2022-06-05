import React, { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

function LightController() {
  const directRef = useRef();
  useHelper(directRef, DirectionalLightHelper, 1); //  react-three/fiber에서 three.js의 helper를 간편하게 쓰게 해주는 drei의 HOOK

  return (
    <>
      <directionalLight
        ref={directRef}
        castShadow
        position={[100, 50, -100]}
        angle={0.2}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadowCameraFar={50}
      />
      <rectAreaLight
        position={[500, 80, 500]}
        intensity={7}
        width={50}
        height={500}
      />
      <rectAreaLight
        position={[-500, 80, 500]}
        intensity={7}
        width={50}
        height={500}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}

export default LightController;
