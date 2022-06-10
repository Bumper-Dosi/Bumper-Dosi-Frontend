import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

const RoadSign = ({ args = [0.7, 0.7, 5, 16], ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/RoadSign/RoadSign.gltf");
  const [roadsign] = useCylinder(() => ({
    type: "Static",
    mass: 5,
    args,
    ...props,
  }));

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 3, 0, 0]} scale={[1.8, 3.0, 1.8]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["ROADWORKS_PREPARE-TO-STOP_1"].geometry}
          material={materials.backing}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["ROADWORKS_PREPARE-TO-STOP_2"].geometry}
          material={materials.prep_stop}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["ROADWORKS_PREPARE-TO-STOP_3"].geometry}
          material={materials.stands}
        />
      </group>
    </group>
  );
};

export default RoadSign;
