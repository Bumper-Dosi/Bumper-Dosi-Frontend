import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import MainPlane from "../models/MainPlane";
import Light from "../models/Light";
import Sphere from "../models/Sphere";
import Vehicle from "../models/Vehicle";
import Pillar from "../models/Pillar";
import EndWall from "../models/EndWall";
import Countdown from "../Countdown";
import { TIME, FONT_SIZE } from "../../constants";

function WaitingRoom({ hexCode }) {
  const [isUsersReady, setIsUsersReady] = useState(false);
  // 두 명 이상의 유저가 주차라인 위로 올라왔을 때 setIsUsersReady(true) 해주는 로직 필요.

  return (
    <>
      <div style={{ width: "99vw", height: "98vh" }}>
        {isUsersReady && (
          <Countdown
            counting={setIsUsersReady}
            count={TIME.GAME_START_WAITING_TIME}
            fontSize={FONT_SIZE.WAITING_ROOM}
          />
        )}
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
            <MainPlane
              rotation={[-Math.PI / 2, 0, 0]}
              userData={{ id: "floor" }}
            />
            <Vehicle
              position={[0, 2, 0]}
              rotation={[0, -Math.PI / 4, 0]}
              angularVelocity={[0, 0.5, 0]}
              wheelRadius={0.3}
              hexCode={hexCode}
            />
            <Pillar position={[5, 2.5, 0]} userData={{ id: "pillar-1" }} />
            <Pillar position={[-20, 5, -5]} userData={{ id: "pillar-2" }} />
            <Sphere position={[20, 20, -5]} userData={{ id: "sphere-1" }} />
            <Sphere position={[20, 20, -25]} userData={{ id: "sphere02" }} />
            <EndWall position={[100, 5, 0]} args={[10, 10, 200]} />
            <EndWall
              position={[0, 5, 100]}
              args={[10, 10, 200]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <EndWall position={[-100, 5, 0]} args={[10, 10, 200]} />
            <EndWall
              position={[0, 5, -100]}
              args={[10, 10, 200]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}

export default WaitingRoom;
