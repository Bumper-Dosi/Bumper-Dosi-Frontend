import React, { useRef } from "react";
import { Vector3, Group } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";
import { useControls } from "../../utils/useControls";

import Car from "./Car";
import Wheel from "./Wheel";

function Vehicle({
  radius = 0.7,
  width = 1.2,
  height = -0.26,
  front = 1.3,
  back = -1.15,
  steer = 0.75,
  force = 2000,
  maxBrake = 100,
  ...props
}) {
  const chassis = useRef();
  const wheel1 = useRef();
  const wheel2 = useRef();
  const wheel3 = useRef();
  const wheel4 = useRef();
  const controls = useControls();

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

  const v = new Vector3();
  const defaultCamera = useThree((state) => state.camera);

  // variable for get velocity
  let prevCoordinateX;
  let prevCoordinateZ;
  let currentCoordinateX;
  let currentCoordinateZ;
  let speed = 0;

  useFrame(() => {
    const { forward, backward, left, right, brake, reset } = controls.current;

    for (let e = 2; e < 4; e++) {
      api.applyEngineForce(
        forward || backward ? force * (forward && !backward ? -2 : 2) : 0,
        2
      );
    }

    for (let s = 0; s < 2; s++) {
      api.setSteeringValue(
        left || right ? steer * (left && !right ? 1 : -1) : 0,
        s
      );
    }

    for (let b = 2; b < 4; b++) {
      api.setBrake(brake ? maxBrake : 0, b);
    }

    if (reset) {
      chassis.current.api.position.set(0, 1, 0);
      chassis.current.api.velocity.set(0, 0, 0);
      chassis.current.api.angularVelocity.set(0, 0.5, 0);
      chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
    }

    v.setFromMatrixPosition(vehicle.current.children[0].matrix);
    defaultCamera.position.x = v.x + 14;
    defaultCamera.position.y = 28;
    defaultCamera.position.z = v.z + 14;
    defaultCamera.lookAt(v);

    prevCoordinateX = v.x;
    prevCoordinateZ = v.z;
    setInterval(() => {
      currentCoordinateX = v.x;
      currentCoordinateZ = v.z;
    }, 300);

    // get velocity
    const xPowValue = Math.pow([currentCoordinateX - prevCoordinateX], 2);
    const zPowValue = Math.pow([currentCoordinateZ - prevCoordinateZ], 2);

    if (xPowValue !== 0 && zPowValue !== 0) {
      speed = Math.sqrt(xPowValue + zPowValue);
    }

    // console.log(speed);
  });

  return (
    <>
      <group ref={vehicle} position={[0, -0.4, 0]}>
        <Car
          ref={chassis}
          rotation={props.rotation}
          position={props.position}
          angularVelocity={props.angularVelocity}
        />
        <Wheel ref={wheel1} radius={radius} leftSide />
        <Wheel ref={wheel2} radius={radius} />
        <Wheel ref={wheel3} radius={radius} leftSide />
        <Wheel ref={wheel4} radius={radius} />
      </group>
    </>
  );
}

export default Vehicle;
