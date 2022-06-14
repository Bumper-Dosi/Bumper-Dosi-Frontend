import React from "react";

function EnergyBar({ energy }) {
  const maxEnergy = 255;
  let damage = maxEnergy - energy;
  let color = ``;
  const isDamageAboveHalf = damage > 127 ? true : false;

  if (isDamageAboveHalf) {
    color = `rgb(${maxEnergy}, ${maxEnergy - damage}, 0)`;
  } else {
    color = `rgba(${damage * 2}, ${maxEnergy}, 0)`;
  }

  return (
    <>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 2]} position={[0, 2.5, 0]}>
        <capsuleGeometry
          attach="geometry"
          args={[0.4, 2 - damage / 100, 10, 10]}
        />
        <meshStandardMaterial attach="material" color={color} />
      </mesh>
    </>
  );
}

export default EnergyBar;
