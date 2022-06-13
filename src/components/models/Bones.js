import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

function Bones({ position, rotation }) {
  const { nodes, materials } = useGLTF("/models/DesertAcc/scene.gltf");
  const [bone] = useBox(() => ({
    type: "Static",
    mass: 5,
    position,
    rotation,
  }));

  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      geometry={nodes["Huesos-Craneo_Base_0"].geometry}
      material={materials.Base}
      rotation={rotation}
      scale={[0.3, 0.3, 0.3]}
    />
  );
}

export default Bones;
