import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Light from "../models/Light";
import Vehicle from "../models/Vehicle";
import EndWall from "../models/EndWall";
import DesertPlane from "./DesertPlane";
import Cactus from "./Cactus";
import getRandomNumber from "../../utils/getRandomNumber";
import DesertRocks from "./DesertRocks";
import Scorpion from "./Scorpion";
import Bones from "./Bones";

function GameRoom({ hexCode }) {
  return (
    <>
      <div style={{ width: "99vw", height: "98vh" }}>
        <Canvas shadows flat linear>
          <color attach="background" args={["#171720"]} />
          <fog attach="fog" args={["#ffffff", 30, 150]} />
          <Stats />
          <Stars />
          <Light />
          <Physics
            gravity={[0, -9.8, 0]}
            broadphase="SAP"
            friction={1e-3}
            defaultContactMaterial={{
              friction: 1e-3,
              restitution: 0.5,
              contactEquationRelaxation: 2,
            }}
            allowSleep
          >
            <Vehicle
              position={[0, 2, 0]}
              rotation={[0, -Math.PI / 4, 0]}
              angularVelocity={[0, 0.5, 0]}
              wheelRadius={0.3}
              hexCode={hexCode}
              userData={{ id: "myCar" }}
            />
            <DesertRocks />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <DesertPlane
              elementSize={(150 * 1) / 128}
              position={[-150 / 2, -1, 150 / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <EndWall position={[70, 1, 0]} args={[10, 10, 130]} />
            <EndWall
              position={[0, 1, 70]}
              args={[10, 10, 130]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <EndWall position={[-70, 1, 0]} args={[10, 10, 130]} />
            <EndWall
              position={[0, 1, -70]}
              args={[10, 10, 130]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}

export default GameRoom;
