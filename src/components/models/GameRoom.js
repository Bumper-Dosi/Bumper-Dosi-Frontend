import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
// import history from "../../history";

// import ReadyTrigger from "./ReadyTrigger";
// import CancelTrigger from "./CancelTrigger";
// import ParkingZone from "./ParkingZone";

import GameRoomPlane from "../models/GameRoomPlane";
import Light from "../models/Light";
import Vehicle from "../models/Vehicle";
import EndWall from "../models/EndWall";

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
            <GameRoomPlane
              rotation={[-Math.PI / 2, 0, 0]}
              userData={{ id: "floor" }}
            />
            <Vehicle
              position={[0, 2, 0]}
              rotation={[0, -Math.PI / 4, 0]}
              angularVelocity={[0, 0.5, 0]}
              wheelRadius={0.3}
              hexCode={hexCode}
              userData={{ id: "myCar" }}
            />
            <EndWall position={[50, 1, 0]} args={[10, 10, 100]} />
            <EndWall
              position={[0, 1, 50]}
              args={[10, 10, 100]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <EndWall position={[-50, 1, 0]} args={[10, 10, 100]} />
            <EndWall
              position={[0, 1, -50]}
              args={[10, 10, 100]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}

export default GameRoom;
