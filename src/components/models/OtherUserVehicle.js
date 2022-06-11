import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";

import Car from "./Car";
import Wheel from "./Wheel";

function OtherUserVehicle({
  radius = 0.7,
  width = 1.2,
  height = -0.26,
  front = 1.0,
  back = -1.15,
  steer = 0.75,
  force = 2000,
  maxBrake = 100,
  user,
  ...props
}) {
  const chassis = useRef();
  const wheel1 = useRef();
  const wheel2 = useRef();
  const wheel3 = useRef();
  const wheel4 = useRef();

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 5,
    dampingCompression: 2.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 15,
  };

  const wheelInfo1 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-width / 2, height, front],
  };
  const wheelInfo2 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [width / 2, height, front],
  };
  const wheelInfo3 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [-width / 2, height, back],
  };
  const wheelInfo4 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [width / 2, height, back],
  };

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: [wheel1, wheel2, wheel3, wheel4],
    wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1,
  }));

  useFrame(() => {
    if (user.position.x) {
      chassis.current.api.position.set(
        user.position.x,
        user.position.y,
        user.position.z
      );
      chassis.current.api.velocity.set(0, 0, 0);
      chassis.current.api.angularVelocity.set(0, 0.5, 0);
      chassis.current.api.quaternion.set(
        user.rotate._x,
        user.rotate._y,
        user.rotate._z,
        user.rotate._w
      );
    } else {
      chassis.current.api.position.set(0, 0, 0);
    }
  });

  return (
    <>
      <group ref={vehicle} position={[0, -0.4, 0]}>
        <Car
          ref={chassis}
          angularVelocity={props.angularVelocity}
          hexCode={user.hexCode}
        />
        <Wheel ref={wheel1} radius={radius} leftSide />
        <Wheel ref={wheel2} radius={radius} />
        <Wheel ref={wheel3} radius={radius} leftSide />
        <Wheel ref={wheel4} radius={radius} />
      </group>
    </>
  );
}

export default OtherUserVehicle;
