import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

function Scorpion({ position, rotation }) {
  const { nodes, materials } = useGLTF("/models/DesertAcc/scene.gltf");
  const [scorpion] = useCylinder(() => ({
    type: "Static",
    mass: 5,
    position,
    rotation,
  }));

  return (
    <mesh
      ref={scorpion}
      castShadow
      receiveShadow
      geometry={nodes["Escorpion002_Base_0"].geometry}
      material={materials.Base}
      scale={[0.1, 0.1, 0.1]}
    />
  );
}

export default Scorpion;
