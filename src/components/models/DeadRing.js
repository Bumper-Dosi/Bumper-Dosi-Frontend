import React from "react";

function DeadRing() {
  const color = "rgb(255, 255, 153)";

  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.5, 0]}>
        <torusGeometry attach="geometry" args={[0.7, 0.25, 10, 100]} />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
    </>
  );
}

export default DeadRing;
