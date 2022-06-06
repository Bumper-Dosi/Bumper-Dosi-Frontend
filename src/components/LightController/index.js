import React, { useRef } from "react";

function LightController() {
  const directRef = useRef();

  return (
    <>
      <pointLight
        castShadow
        position={[0, 25, 0]}
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
