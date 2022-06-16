import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import anton from "../../assets/fonts/Anton/Anton_Regular.json";

function PlaySign() {
  const font = new FontLoader().parse(anton);
  const playSignRef = useRef();
  extend({ TextGeometry });

  useFrame(({ clock}) => {
    playSignRef.current.position.x = Math.sin(clock.getElapsedTime()) - 0.6;
  });

  return (
    <mesh position={[-2, 5, -19]} castShadow ref={playSignRef}>
      <textGeometry args={["Come in!", { font, size: 3, height: 0.5 }]} />
      <meshPhysicalMaterial
        attach="material"
        color="#ffffff"
        reflectivity={0.4}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
}

export default PlaySign;
