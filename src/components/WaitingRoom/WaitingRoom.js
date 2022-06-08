import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Stats } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import MainPlane from "../models/MainPlane";
import Light from "../models/Light";
import Sphere from "../models/Sphere";
import Vehicle from "../models/Vehicle";
import Pillar from "../models/Pillar";
import EndWall from "../models/EndWall";
// import Countdown from "../Countdown";

function WaitingRoom({ setIsFriendListOpened }) {
  return (
    <>
      <div style={{ width: "99vw", height: "98vh" }}>
      {/* <Countdown count={5}/> */}
        <Canvas shadows flat linear>
          <fog attach="fog" args={["#ffffff", 30, 150]} />
          <Stats />
          <Sky />
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
            <MainPlane
              rotation={[-Math.PI / 2, 0, 0]}
              userData={{ id: "floor" }}
            />
            <Vehicle
              position={[0, 2, 0]}
              rotation={[0, -Math.PI / 4, 0]}
              angularVelocity={[0, 0.5, 0]}
              wheelRadius={0.3}
            />
            <Pillar position={[5, 2.5, 0]} userData={{ id: "pillar-1" }} />
            <Pillar position={[-20, 5, -5]} userData={{ id: "pillar-2" }} />
            <Sphere position={[20, 20, -5]} userData={{ id: "sphere-1" }} />
            <Sphere position={[20, 20, -25]} userData={{ id: "sphere02" }} />
            <EndWall position={[100, 5, 0]} args={[10, 10, 200]} />
            <EndWall position={[0, 5, 100]} args={[10, 10, 200]} rotation={[0, Math.PI / 2, 0]}/>
            <EndWall position={[-100, 5, 0]} args={[10, 10, 200]} />
            <EndWall position={[0, 5, -100]} args={[10, 10, 200]} rotation={[0, Math.PI / 2, 0]}/>
          </Physics>
        </Canvas>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 102,
        }}
      >
        <button
          type="button"
          onClick={() => { setIsFriendListOpened(true) }}
        >
          list
        </button>
      </div>
    </>
  );
}

export default WaitingRoom;
