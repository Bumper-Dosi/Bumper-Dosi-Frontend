import React, { forwardRef } from "react";
import { BoxHelper } from "three";
import { useGLTF, useHelper } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

import EnergyBar from "./EnergyBar";

useGLTF.preload("/models/Car/suv.glb");

const Car = forwardRef(
  ({ args = [1.7, 1, 4], mass = 500, hexCode, ...props }, chassis) => {
    const { nodes, materials } = useGLTF("/models/Car/suv.glb");
    const [, api] = useBox(
      () => ({
        mass,
        args,
        allowSleep: false,
        onCollide: (e) => console.log("bonk", e.body.userData),
        ...props,
      }),
      chassis
    );
    useHelper(chassis, BoxHelper, "blue");

    return (
      <>
        <group ref={chassis} api={api} {...props} dispose={null}>
          <EnergyBar />
          <group position={[0, 0.2, -0.1]} rotation={[0, -Math.PI, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_body.geometry}
              material={materials.plastic}
            >
              <meshStandardMaterial color={hexCode} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_body_1.geometry}
              material={materials.paintGreen}
            >
              <meshStandardMaterial color={hexCode} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_body_2.geometry}
              material={nodes.Mesh_body_2.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_body_3.geometry}
              material={materials.window}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_body_4.geometry}
              material={materials.lightBack}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_body_5.geometry}
              material={materials.lightFront}
            />
            <group
              position={[0, 0.5, 1.15]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[-1, 1, 1]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_wheel_frontLeft.geometry}
                material={nodes.Mesh_wheel_frontLeft.material}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
                material={nodes.Mesh_wheel_frontLeft_1.material}
              />
            </group>
          </group>
          <group position={[-0.35, 0.3, 0.56]} scale={[-1, 1, 1]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft.geometry}
              material={nodes.Mesh_wheel_frontLeft.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
              material={nodes.Mesh_wheel_frontLeft_1.material}
            />
          </group>
          <group position={[0.35, 0.3, 0.56]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft.geometry}
              material={nodes.Mesh_wheel_frontLeft.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
              material={nodes.Mesh_wheel_frontLeft_1.material}
            />
          </group>
          <group position={[-0.35, 0.3, -0.76]} scale={[-1, 1, 1]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft.geometry}
              material={nodes.Mesh_wheel_frontLeft.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
              material={nodes.Mesh_wheel_frontLeft_1.material}
            />
          </group>
          <group position={[0.35, 0.3, -0.76]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft.geometry}
              material={nodes.Mesh_wheel_frontLeft.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Mesh_wheel_frontLeft_1.geometry}
              material={nodes.Mesh_wheel_frontLeft_1.material}
            />
          </group>
        </group>
      </>
    );
  }
);

export default Car;
