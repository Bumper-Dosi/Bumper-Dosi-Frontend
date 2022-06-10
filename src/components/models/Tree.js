import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

const Tree = ({ args = [0.7, 0.7, 5, 16], ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Tree/Tree.glb");
  const [tree] = useCylinder(() => ({
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
        geometry={nodes.Tree.geometry}
        material={materials.Material}
        scale={[0.4, 1.5, 0.4]}
      />
    </group>
  );
};

export default Tree;
