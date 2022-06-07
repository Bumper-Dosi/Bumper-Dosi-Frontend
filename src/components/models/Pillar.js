import React from "react";
import { useCylinder } from "@react-three/cannon";

function Pillar({ args = [0.7, 0.7, 5, 16], ...props }) {
  const [pillar] = useCylinder(() => ({
    type: "Static",
    mass: 5,
    args,
    ...props,
  }));

  return (
    <mesh ref={pillar} castShadow>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default Pillar;
