import React, { forwardRef, useEffect, useState, useRef } from "react";
import { BoxHelper } from "three";
import { useGLTF, useHelper, PositionalAudio } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

import EnergyBar from "./EnergyBar";
import EngineAudio from "../../effects/audio/Engine";
import HonkAudio from "../../effects/audio/Honk";
import DeadRing from "./DeadRing";

useGLTF.preload("/models/Car/suv.glb");

const Car = forwardRef(
  (
    {
      args = [1.7, 1, 4],
      mass = 500,
      hexCode,
      velocity,
      angle,
      energy,
      setEnergy,
      otherUsers,
      isGameMode,
      setKillCount,
      myData,
      isMute,
      setIsMyEnergyEmpty,
      ...props
    },
    chassis
  ) => {
    const [collidedObject, setCollidedObject] = useState("");
    const crashAudio = useRef();
    const { nodes, materials } = useGLTF("/models/Car/suv.glb");

    const [, api] = useBox(
      () => ({
        mass,
        args,
        allowSleep: false,
        onCollide: (e) => setCollidedObject(e.body.userData.id),
        ...props,
      }),
      chassis
    );
    useHelper(chassis, BoxHelper, "blue");

    const getCollidedDirection = (userAngle, otherUserAngle) => {
      if (
        (userAngle + otherUserAngle) / 2 <= userAngle + 0.2 &&
        (userAngle + otherUserAngle) / 2 >= userAngle - 0.2
      ) {
        return "rear";
      } else if (
        Math.abs(userAngle) + Math.abs(otherUserAngle) >= 2.6 &&
        Math.abs(userAngle) + Math.abs(otherUserAngle) <= 3.4
      ) {
        return "front";
      } else {
        return "side";
      }
    };

    const debounceFunc = (callback, delay) => {
      let timer;

      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
      };
    };

    useEffect(() => {
      if (!otherUsers) return;
      if (!isGameMode) return;

      if (myData.energy <= 0 ) {
        setIsMyEnergyEmpty(true);
      }

      otherUsers.forEach((otherUser) => {
        if (otherUser.user === collidedObject) {
          crashAudio.current.setVolume(2);
          if (!crashAudio.current.isPlaying) {
            crashAudio.current.play();
          }

          if (myData.energy < 0) {
            api.angularVelocity.set(100, 100, 100);
          }

          if (getCollidedDirection(angle, otherUser.angle) === "front") {
            setEnergy(
              (prev) =>
                prev - Math.abs(Math.floor(otherUser.velocity * 10 * 1.2))
            );
          } else if (getCollidedDirection(angle, otherUser.angle) === "rear") {
            setEnergy((prev) => {
              if (
                prev - Math.floor((otherUser.velocity - velocity) * 10 * 1.5) <=
                255
              ) {
                return (
                  prev - Math.floor((otherUser.velocity - velocity) * 10 * 1.5)
                );
              } else {
                return 255;
              }
            });
          } else {
            setEnergy(
              (prev) => prev - Math.abs(Math.floor(otherUser.velocity * 10))
            );
          }

          if (otherUser.energy < 0) {
            debounceFunc(
              setKillCount((prev) => prev + 1),
              50
            );
          }

          setCollidedObject("");
        }
      });
    }, [collidedObject]);

    return (
      <>
        <group ref={chassis} api={api} {...props} dispose={null}>
          {isGameMode ? (
            energy <= 0 ? (
              <DeadRing />
            ) : (
              <EnergyBar energy={energy} />
            )
          ) : null}
          {!isMute && <EngineAudio velocity={velocity} />}
          {!isMute && <HonkAudio />}
          <PositionalAudio
            ref={crashAudio}
            url="/sounds/crash.mp3"
            loop={false}
            distance={5}
          />
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
        </group>
      </>
    );
  }
);

export default Car;
