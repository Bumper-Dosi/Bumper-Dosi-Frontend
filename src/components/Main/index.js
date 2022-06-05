import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import styled from "styled-components";

import MainPlane from "../models/MainPlane";
import LightController from "../LightController";
import Sphere from "../models/Sphere";
import Vehicle from "../models/Vehicle";
import Pillar from "../models/Pillar";

function Main() {
  return (
    <>
      <div style={{ width: "99vw", height: "98vh" }}>
        <Canvas shadows flat linear>
          <fog attach="fog" args={["#ffffff", 50, 200]} />
          <Sky />
          <LightController />
          <Physics
            gravity={[0, -9.8, 0]}
            broadphase="SAP"
            contactEquationRelaxation={4}
            friction={1e-3}
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
          </Physics>
        </Canvas>
      </div>
    </>
  );
}

export default Main;
