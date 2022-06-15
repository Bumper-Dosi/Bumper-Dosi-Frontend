import React, { useEffect } from "react";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import anton from "../../assets/fonts/Anton/Anton_Regular.json";

// setTimeout(() => {
//   extend({ TextGeometry });
// }, 0);

function Title() {
  const font = new FontLoader().parse(anton);
  extend({ TextGeometry });

  return (
    <mesh position={[-3.55, 1, 0]}>
      <textGeometry args={["Bumper Dosi", { font, size: 1, height: 0.5 }]} />
      <meshPhysicalMaterial
        attach="material"
        color="#ff7f00"
        reflectivity={0.8}
        metalness={0.3}
        roughness={0.5}
      />
    </mesh>
  );
}

export default Title;
