import React from "react";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import anton from "../../assets/fonts/Anton/Anton_Regular.json";

function RepoSign() {
  const font = new FontLoader().parse(anton);
  extend({ TextGeometry });

  return (
    <mesh position={[-45, 3.3, 44]} rotation={[0, Math.PI / 2, 0]}>
      <textGeometry args={["Git Hub", { font, size: 1.8, height: 0.5 }]} />
      <meshPhysicalMaterial
        attach="material"
        color="#ffffff"
        reflectivity={0.8}
        metalness={0.3}
        roughness={0.5}
      />
    </mesh>
  );
}

export default RepoSign;
