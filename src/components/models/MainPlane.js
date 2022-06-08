import React from "react";
import { usePlane } from "@react-three/cannon";
import { COLOR } from "../../constants/style";

function ManePlane(props) {
  const [ref] = usePlane(() => ({
    type: "Static",
    material: "ground",
    ...props,
  }));

  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshPhysicalMaterial color={COLOR.ROAD_COLOR} metalness={0} />
      </mesh>
    </group>
  );
}

export default ManePlane;