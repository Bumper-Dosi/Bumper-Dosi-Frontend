import React, { useEffect, useRef } from "react";
import { DirectionalLightHelper } from "three";
import { useHelper } from "@react-three/drei";
import useShadowHelper from "../../hooks/useShadowHelper";

function Light() {
  const directRef = useRef();
  const mainPointRef = useRef();
  const wallPointRef1 = useRef();
  const wallPointRef2 = useRef();
  useHelper(directRef, DirectionalLightHelper, 1);
  useShadowHelper(directRef);

  useEffect(() => {
    mainPointRef.current.shadow.radius = 6;
    wallPointRef1.current.shadow.radius = 3;
    wallPointRef2.current.shadow.radius = 3;
  }, []);

  return (
    <>
      <pointLight
        ref={mainPointRef}
        castShadow
        position={[0, 25, 0]}
        intensity={1}
        shadow-mapSize-width={1400}
        shadow-mapSize-height={1400}
        shadowCameraFar={50}
      />
      <pointLight
        ref={wallPointRef1}
        castShadow
        position={[-120, 20, 0]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadowCameraFar={50}
      />
      <pointLight
        ref={wallPointRef2}
        castShadow
        position={[0, 20, -120]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadowCameraFar={50}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}

export default Light;
