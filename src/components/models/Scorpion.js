import { useGLTF } from "@react-three/drei";

function Scorpion({ position, rotation }) {
  const { nodes, materials } = useGLTF("/models/DesertAcc/scene.gltf");

  return (
    <mesh
      position={position}
      geometry={nodes["Escorpion002_Base_0"].geometry}
      material={materials.Base}
      scale={[0.1, 0.1, 0.1]}
      rotation={rotation}
    />
  );
}

export default Scorpion;
