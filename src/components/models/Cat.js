import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

function Cat({ position, rotation }) {
  const { nodes, materials } = useGLTF("/models/Cat/scene.gltf");
  const [cat] = useBox(() => ({
    type: "Static",
    mass: 1,
    position,
    rotation,
  }));

  return (
    <mesh
      castShadow
      receiveShadow
      position={position}
      geometry={nodes["Object_4"].geometry}
      material={materials.material_0}
      rotation={rotation}
      scale={[10, 10, 10]}
    />
  );
}

export default Cat;
