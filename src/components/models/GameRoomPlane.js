import React from "react";
import { usePlane } from "@react-three/cannon";
import { COLOR } from "../../constants/style";

function GameRoomPlane(props) {
  const [ref] = usePlane(() => ({
    type: "Static",
    material: "ground",
    ...props,
  }));

  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <circleGeometry args={[65, 65]} />
        <meshPhysicalMaterial color={COLOR.BACKGROUND_COLOR} metalness={0} />
      </mesh>
    </group>
  );
}

export default GameRoomPlane;
