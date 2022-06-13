import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

function DesertRocks({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/DesertRocks/scene.gltf");
  const [rock] = useBox(() => ({
    type: "Static",
    mass: 10,
    ...props,
  }));

  return (
    <group ref={rock}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_1_Rock_1_0"].geometry}
        material={materials.Rock_1}
        position={[-65, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 2, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_4_Rock_4_0"].geometry}
        material={materials.Rock_4}
        position={[-65, 5, -17]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 5, 7]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_5_Rock_5_0"].geometry}
        material={materials.Rock_5}
        position={[-70, 2, -45]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        scale={[3, 5, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_6_Rock_6_0"].geometry}
        material={materials.Rock_6}
        position={[-60, 5, 50]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[3, 3, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_7_Rock_7_0"].geometry}
        material={materials.Rock_7}
        position={[-33, 2, -60]}
        scale={[4, 7, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_8_Rock_8_0"].geometry}
        material={materials.Rock_8}
        position={[-25, 11, 70]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 5, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_9_Rock_9_0"].geometry}
        material={materials.Rock_9}
        position={[-10, 2, 65]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[50, 15, 30]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_10_Rock_10_0"].geometry}
        material={materials.Rock_10}
        position={[45, 5, 70]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[25, 7, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[60, 4, 70]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[20, 10, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[70, 4, 60]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[20, 10, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[70, 4, 40]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[20, 10, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[70, 4, 20]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[20, 10, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[70, 4, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[20, 12, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[70, 4, -20]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[20, 12, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[70, 4, -40]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[20, 12, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_11_Rock_11_0"].geometry}
        material={materials.Rock_11}
        position={[70, 4, -60]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[20, 12, 5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_12_Rock_12_0"].geometry}
        material={materials.Rock_12}
        position={[0, 2, -65]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 3, 15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_13_Rock_13_0"].geometry}
        material={materials.Rock_13}
        position={[60, 0, -65]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[5, 5, 3]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Rock_1_Rock_1_0"].geometry}
        material={materials.Rock_1}
        position={[10, 10, -65]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[3, 1, 2]}
      />
    </group>
  );
}

export default DesertRocks;
