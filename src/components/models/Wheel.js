import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

useGLTF.preload("/models/Car/Wheel.glb");

const Wheel = forwardRef(
  ({ rotation, radius = 0.7, leftSide, ...props }, ref) => {
    const { nodes, materials } = useGLTF("/models/Car/Wheel.glb");
    useCylinder(
      () => ({
        mass: 1,
        type: "Kinematic",
        material: "wheel",
        rotation,
        collisionFilterGroup: 0,
        args: [radius, radius, 0.5, 16],
        ...props,
      }),
      ref
    );

    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_wheelDefault_1.geometry}
          material={materials.carTire}
        />
      </group>
    );
  }
);

export default Wheel;
