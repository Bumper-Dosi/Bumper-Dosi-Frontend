import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

function Bush({ args = [0.7, 0.7, 5, 16], ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Bush/Bush.glb");
  const [bush] = useCylinder(() => ({
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
        geometry={nodes.Bush.geometry}
        material={materials.Material}
        scale={[1.5, 1.5, 1.5]}
      />
    </group>
  );
}

export default Bush;
