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
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color={COLOR.ROAD_COLOR} />
      </mesh>
    </group>
  );
}

export default ManePlane;
