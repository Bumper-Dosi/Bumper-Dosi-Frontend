import React, { useRef, useEffect, useState } from "react";
import { Vector3, Quaternion } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";
import { io } from "socket.io-client";

import { useControls } from "../../hooks/useControls";
import getRandomNumber from "../../utils/getRandomNumber";

import Car from "./Car";
import Wheel from "./Wheel";

function Vehicle({
  radius = 0.7,
  width = 1.2,
  height = -0.26,
  front = 1.0,
  back = -1.15,
  steer = 0.75,
  force = 2000,
  maxBrake = 100,
  hexCode,
  user,
  otherUsers,
  updateOtherUsers,
  removeOtherUser,
  disconnectedSocketId,
  setDisconnectedSocketId,
  updateOtherUserPosition,
  ...props
}) {
  const chassis = useRef();
  const wheel1 = useRef();
  const wheel2 = useRef();
  const wheel3 = useRef();
  const wheel4 = useRef();
  const controls = useControls();
  const [rotate, setRotate] = useState([]);
  const [socket, setSocket] = useState(null);
  const [transferInterval, setTransferInterval] = useState(true);
  const [prevCoordinate, setPrevCoordinate] = useState({});
  const [currentCoordinate, setCurrentCoordinate] = useState({});
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState([
    getRandomNumber(-40, 40),
    4,
    getRandomNumber(-40, 40),
  ]);


  const v = new Vector3();
  const quaternion = new Quaternion();
  const defaultCamera = useThree((state) => state.camera);

  useEffect(() => {
    const socket = io.connect("http://localhost:8000", {
      withCredentials: true,
    });

    setSocket(socket);

    socket.emit("joinWorld", {
      user,
      position,
      hexCode,
      rotate,
      velocity,
    });

    socket.on("noticeMe", (otherUserInfo) => {
      setDisconnectedSocketId(otherUserInfo.socketId);
      updateOtherUsers(otherUserInfo);
    });

    const dataTransferInterval = setInterval(() => {
      setTransferInterval((prev) => !prev);
    }, 15);

    return () => {
      socket.off("noticeMe");
      socket.off("joinWorld");
      clearInterval(dataTransferInterval);
    };
  }, []);

  useEffect(() => {
    if (socket === null || user === undefined) return;

    socket.on("joinWorld", (otherUserInfo) => {
      setDisconnectedSocketId(otherUserInfo.socketId);
      updateOtherUsers(otherUserInfo);

      socket.emit("noticeMe", {
        user,
        position,
        hexCode,
        rotate,
        velocity,
      });
    });

    return () => {
      socket.off("joinWorld");
      socket.off("noticeMe");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null || user === undefined) return;

    socket.on("deletePlayer", ({ id }) => {
      let deletePlayerUid = "";

      otherUsers.forEach((element) => {
        if (element.socketId === id) {
          deletePlayerUid = element.user;
        }
      });

      removeOtherUser(deletePlayerUid);

      return () => {
        socket.off("deletePlayer");
      };
    });

    return () => {
      socket.off("deletePlayer");
    };
  }, [disconnectedSocketId]);

  useEffect(() => {
    if (socket === null || user === undefined) return;

    socket.emit("userMovement", { position, rotate, velocity });

    socket.on("userMovement", (data) => {
      updateOtherUserPosition(data);
    });

    return () => {
      socket.off("userMovement");
    };
  }, [transferInterval]);

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
    frictionSlip: 30,
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

  useEffect(() => {
    chassis.current.api.position.set(position[0], position[1], position[2]);
    chassis.current.api.velocity.set(0, 0, 0);
    chassis.current.api.angularVelocity.set(0, 0.5, 0);
    chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
  }, []);

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
      chassis.current.api.position.set(position.x, 4, position.z);
      chassis.current.api.velocity.set(0, 0, 0);
      chassis.current.api.angularVelocity.set(0, 0.5, 0);
      chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
    }

    v.setFromMatrixPosition(vehicle.current.children[0].matrix);
    quaternion.setFromRotationMatrix(vehicle.current.children[0].matrix);

    defaultCamera.position.x = v.x + 10;
    defaultCamera.position.y = 20;
    defaultCamera.position.z = v.z + 10;
    defaultCamera.lookAt(v);

    setPosition(v);
    setRotate(quaternion);
    setPrevCoordinate(v);

    setTimeout(() => {
      setCurrentCoordinate(v);
    }, 200);

    const xPowValue = Math.pow([currentCoordinate.x - prevCoordinate.x], 2);
    const zPowValue = Math.pow([currentCoordinate.z - prevCoordinate.z], 2);

    if (typeof xPowValue === "number" && typeof xPowValue === "number") {
      setVelocity(Math.sqrt(xPowValue + zPowValue));
    }
  });

  return (
    <>
      <group ref={vehicle} position={[0, -0.4, 0]}>
        <Car
          ref={chassis}
          rotation={props.rotation}
          position={props.position}
          angularVelocity={props.angularVelocity}
          hexCode={hexCode}
        />
        <Wheel ref={wheel1} radius={radius} leftSide />
        <Wheel ref={wheel2} radius={radius} rotation={[0, Math.PI / 2, 0]} />
        <Wheel ref={wheel3} radius={radius} leftSide />
        <Wheel ref={wheel4} radius={radius} rotation={[0, Math.PI / 2, 0]} />
      </group>
    </>
  );
}

export default Vehicle;
