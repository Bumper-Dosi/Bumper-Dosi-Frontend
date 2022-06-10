import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

const Spruce = ({ args = [0.7, 0.7, 5, 16], ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Spruce/Spruce.glb");
  const [Spruce] = useCylinder(() => ({
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
        geometry={nodes.Spruce.geometry}
        material={materials.Material}
        scale={[1.7, 2.1, 1.7]}
      />
    </group>
  );
};

export default Spruce;
