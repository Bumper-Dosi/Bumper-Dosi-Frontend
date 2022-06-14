import React from "react";

function BoostGuage({ boostTime, guagePosition }) {
  const color = "rgb(250, 184, 58)";

  return (
    <>
      <mesh
        rotation={[0, Math.PI / 4, Math.PI / 2]}
        position={[guagePosition.x - 8, 15, guagePosition.z + 8]}
      >
        <capsuleGeometry
          attach="geometry"
          args={[0.3, boostTime / 40, 10, 10]}
        />
        <meshToonMaterial attach="material" color={color} />
      </mesh>
    </>
  );
}

export default BoostGuage;
