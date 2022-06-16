import React, { useRef, useEffect, useState } from "react";
import { Vector3, Quaternion } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";
import { io } from "socket.io-client";

import { useControls } from "../../hooks/useControls";
import getRandomNumber from "../../utils/getRandomNumber";

import Car from "./Car";
import Wheel from "./Wheel";
import BoostGuage from "./BoostGuage";

function Vehicle({
  radius = 0.7,
  width = 1.2,
  height = -0.26,
  front = 1.2,
  back = -1.8,
  steer = 0.75,
  force = 2300,
  maxBrake = 100,
  hexCode,
  user,
  otherUsers,
  updateOtherUsers,
  removeOtherUser,
  disconnectedSocketId,
  setDisconnectedSocketId,
  updateOtherUserPosition,
  isGameMode,
  updateMyPosition,
  myData,
  setMyData,
  isMute,
  setIsMute,
  setIsMyEnergyEmpty,
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
  const [angle, setAngle] = useState(0);
  const [energy, setEnergy] = useState(255);
  const [boostTime, setBoostTime] = useState(300);
  const [killCount, setKillCount] = useState(0);
  const [position, setPosition] = useState([
    getRandomNumber(-40, 40),
    4,
    getRandomNumber(-10, 30),
  ]);

  const v = new Vector3();
  const quaternion = new Quaternion();
  const defaultCamera = useThree((state) => state.camera);

  useEffect(() => {
    setIsMute &&
      window.addEventListener("keydown", (event) => {
        if (event.key === "m") {
          setIsMute((prev) => !prev);
        }
      });
  }, []);

  useEffect(() => {
    if (!user) return;
    const socket = io.connect(`${process.env.REACT_APP_SERVER_URL}`, {
      withCredentials: true,
    });

    setSocket(socket);

    if (isGameMode) {
      socket.emit("joinGame", {
        user,
        position,
        hexCode,
        rotate,
        velocity,
        angle,
        energy,
        killCount,
      });
    } else {
      socket.emit("joinWorld", {
        user,
        position,
        hexCode,
        rotate,
        velocity,
        angle,
        energy,
        killCount,
      });
    }

    socket.on("noticeMe", (otherUserInfo) => {
      setDisconnectedSocketId(otherUserInfo.socketId);
      updateOtherUsers(otherUserInfo);

      const userData = {
        user,
        position,
        rotate,
        velocity,
        angle,
        energy,
        killCount,
      };

      setMyData(userData);
    });

    const dataTransferInterval = setInterval(() => {
      setTransferInterval((prev) => !prev);
    }, 15);

    return () => {
      socket.off("noticeMe");
      socket.off("joinWorld");
      clearInterval(dataTransferInterval);
      socket.disconnect();
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
        angle,
        energy,
        killCount,
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
      const deletePlayerUid = otherUsers.find(
        (otherUser) => otherUser.socketId === id
      );

      deletePlayerUid && removeOtherUser(deletePlayerUid.user);

      return () => {
        socket.off("deletePlayer");
        socket.disconnect();
      };
    });

    return () => {
      socket.off("deletePlayer");
    };
  }, [disconnectedSocketId]);

  useEffect(() => {
    if (socket === null || user === undefined) return;

    socket.emit("userMovement", {
      user,
      hexCode,
      position,
      rotate,
      velocity,
      angle,
      energy,
      killCount,
    });

    socket.on("userMovement", (data) => {
      updateOtherUserPosition(data);
    });

    setMyData({
      user,
      hexCode,
      position,
      rotate,
      velocity,
      angle,
      energy,
      killCount,
    });

    return () => {
      socket.off("userMovement");
    };
  }, [transferInterval]);

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 15,
    suspensionRestLength: 0,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 5,
    dampingCompression: 2.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    frictionSlip: 30,
  };

  const wheelInfo1 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-width / 1.5, height, front],
  };
  const wheelInfo2 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [width / 2, height, front],
  };
  const wheelInfo3 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [-width / 1.5, height, back],
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
    const { forward, backward, left, right, brake, boost, honk, reset } =
      controls.current;

    if (boost && boostTime >= 0) {
      force = 5000;
      setBoostTime((prev) => prev - 3);
    } else if (boostTime < 300) {
      setBoostTime((prev) => prev + 0.5);
    }

    if (energy <= 0) {
      force = 0;
    }

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

    const direction = new Vector3(0, 0, -1).applyQuaternion(quaternion);
    const carAngle = Math.atan2(direction.z, direction.x);

    defaultCamera.position.x = v.x + 10;
    defaultCamera.position.y = 20;
    defaultCamera.position.z = v.z + 10;
    defaultCamera.lookAt(v);

    setPosition(v);
    setRotate(quaternion);
    setPrevCoordinate(v);
    setAngle(Number(carAngle.toFixed(3)));

    setTimeout(() => {
      setCurrentCoordinate(v);
    }, 200);

    const xPowValue = Math.pow([currentCoordinate.x - prevCoordinate.x], 2);
    const zPowValue = Math.pow([currentCoordinate.z - prevCoordinate.z], 2);

    if (typeof xPowValue === "number" && typeof xPowValue === "number") {
      setVelocity(Number(Math.sqrt(xPowValue + zPowValue).toFixed(2)));
    }
  });

  return (
    <>
      <BoostGuage boostTime={boostTime} guagePosition={position} />
      <group ref={vehicle} position={[0, -0.4, 0]} userData={{ id: user }}>
        <Car
          ref={chassis}
          rotation={props.rotation}
          position={props.position}
          angularVelocity={props.angularVelocity}
          hexCode={hexCode}
          velocity={velocity}
          otherUsers={otherUsers}
          energy={energy}
          setEnergy={setEnergy}
          angle={angle}
          isGameMode={isGameMode}
          setKillCount={setKillCount}
          myData={myData}
          isMute={isMute}
          setIsMyEnergyEmpty={setIsMyEnergyEmpty}
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
