import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

const Cactus = ({ args = [0.7, 0.7, 5, 16], ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Cactus/Cactus.glb");
  const [cactus] = useCylinder(() => ({
    type: "Static",
    mass: 5,
    args,
    ...props,
  }));

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cactus.geometry}
        material={materials.Material}
        scale={[0.61, 1.8, 0.61]}
      />
    </group>
  );
};

export default Cactus;
