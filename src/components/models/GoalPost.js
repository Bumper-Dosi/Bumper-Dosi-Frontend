import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/soccer_goal/goalPost.glb");
  return (
    <group ref={group} {...props} dispose={null} position={[42, 2.2, 20]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_Cylinder_001.geometry}
        material={materials.metalpipe}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_001_Cylinder_002.geometry}
        material={nodes.Cylinder_001_Cylinder_002.material}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_002_Cylinder_003.geometry}
        material={nodes.Cylinder_002_Cylinder_003.material}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder_003_Cylinder_004.geometry}
        material={nodes.Cylinder_003_Cylinder_004.material}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/soccer_goal/goalPost.glb");
