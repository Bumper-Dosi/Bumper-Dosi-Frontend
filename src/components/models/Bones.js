import { useGLTF } from "@react-three/drei";

function Bones({ position, rotation }) {
  const { nodes, materials } = useGLTF("/models/DesertAcc/scene.gltf");

  return (
    <mesh
      position={position}
      geometry={nodes["Huesos-Craneo_Base_0"].geometry}
      material={materials.Base}
      rotation={rotation}
      scale={[0.3, 0.3, 0.3]}
      // rotation={rotation}
    />
  );
}

export default Bones;
