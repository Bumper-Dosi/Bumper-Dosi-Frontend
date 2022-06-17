import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import styled from "styled-components";

import MainPlane from "../models/MainPlane";
import Light from "../models/Light";
import Sphere from "../models/Sphere";
import RedSphere from "../models/RedSphere";
import Vehicle from "../models/Vehicle";
import Tree from "../models/Tree";
import Cactus from "../models/Cactus";
import Bush from "../models/Bush";
import RoadSign from "../models/RoadSign";
import Spruce from "../models/Spruce";
import Box from "../models/Box";
import EndWall from "../models/EndWall";
import Countdown from "../Countdown";
import OtherUserVehicle from "../models/OtherUserVehicle";
import ParkingZone from "../models/ParkingZone";
import Cat from "../models/Cat";
import Boost from "../Boost/Boost";

import { TIME, FONT_SIZE } from "../../constants";
import { Vector3 } from "three";
import TextBox from "../TextBox/TextBox";
import PlaySign from "../models/PlaySign";
import RepoSign from "../models/RepoSign";
import BGMPlayer from "../../effects/audio/BGM";
import GoalPost from "../models/GoalPost";

const WaitingRoomLayout = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function WaitingRoom({
  hexCode,
  user,
  startGameFn,
  isGameMode,
  myData,
  setMyData,
  isMute,
  setIsMute,
}) {
  const [isUsersReady, setIsUsersReady] = useState(true);
  const [otherUsers, setOtherUsers] = useState([]);
  const [disconnectedSocketId, setDisconnectedSocketId] = useState("");
  const [readyUsers, setReadyUsers] = useState([]);
  const [boostTime, setBoostTime] = useState(300);

  const updateOtherUsers = (userInfo) => {
    if (!userInfo) return;

    setOtherUsers((prev) => prev.concat(userInfo));
  };

  const updateOtherUserPosition = (data) => {
    if (!data) return;

    if (!otherUsers.find((element) => element.socketId === data.socketId))
      return;

    const updatedOtherUsers = otherUsers.map((element) =>
      element.socketId === data.socketId ? { ...element, ...data } : element
    );

    setOtherUsers(updatedOtherUsers);
  };

  const updateMyPosition = (userData) => {
    if (!userData) return;

    setMyData(userData);
  };

  const removeOtherUser = (userInfo) => {
    setOtherUsers((prev) =>
      prev.filter((oldUser) => oldUser.user !== userInfo)
    );
  };

  return (
    <WaitingRoomLayout>
      {user && <Boost boostTime={boostTime} />}
      <BGMPlayer isMute={isMute} />
      {readyUsers.includes(user) && isUsersReady && (
        <Countdown
          setCount={setIsUsersReady}
          count={TIME.GAME_START_WAITING_TIME}
          fontSize={FONT_SIZE.WAITING_ROOM}
          top={"40%"}
          left={"50%"}
        />
      )}
      <Canvas shadows flat linear>
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#ffffff", 30, 150]} />
        <Sky
          azimuth={0.1}
          turbidity={10}
          rayleigh={0.5}
          inclination={0.6}
          distance={1000}
          sunPosition={new Vector3(1, 1, 1)}
        />
        <Light />
        <RepoSign />
        <PlaySign />
        <GoalPost />
        <Physics
          gravity={[0, -9.8, 0]}
          broadphase="SAP"
          friction={1e-3}
          defaultContactMaterial={{
            friction: 1e-3,
            restitution: 0.5,
            contactEquationRelaxation: 2,
          }}
          allowSleep
        >
          <MainPlane
            rotation={[-Math.PI / 2, 0, 0]}
            userData={{ id: "floor" }}
          />
          <Vehicle
            position={[0, 2, 0]}
            rotation={[0, -Math.PI / 4, 0]}
            angularVelocity={[0, 0.5, 0]}
            wheelRadius={0.3}
            hexCode={hexCode}
            userData={{ id: "myCar" }}
            user={user}
            updateOtherUsers={updateOtherUsers}
            removeOtherUser={removeOtherUser}
            disconnectedSocketId={disconnectedSocketId}
            setDisconnectedSocketId={setDisconnectedSocketId}
            otherUsers={otherUsers}
            updateOtherUserPosition={updateOtherUserPosition}
            isGameMode={isGameMode}
            myData={myData}
            setMyData={setMyData}
            updateMyPosition={updateMyPosition}
            isMute={isMute}
            setIsMute={setIsMute}
            boostTime={boostTime}
            setBoostTime={setBoostTime}
          />
          {otherUsers.length > 0 &&
            otherUsers.map((otherUser) => (
              <OtherUserVehicle
                user={otherUser}
                key={otherUser.socketId}
                userData={{ id: `${otherUser.user}` }}
                isGameMode={isGameMode}
              />
            ))}
          <ParkingZone
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.1, -15]}
            userData={{ id: "parking" }}
            startGameFn={() => {
              startGameFn("/gameroom1");
            }}
            user={user}
            readyUsers={readyUsers}
            setReadyUsers={setReadyUsers}
            setIsUsersReady={setIsUsersReady}
          />
          <ParkingZone
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-10, 0.1, -15]}
            userData={{ id: "parking" }}
            startGameFn={() => {
              startGameFn("/gameroom1");
            }}
            user={user}
            readyUsers={readyUsers}
            setReadyUsers={setReadyUsers}
            setIsUsersReady={setIsUsersReady}
          />
          <ParkingZone
            rotation={[-Math.PI / 2, 0, 0]}
            position={[10, 0.1, -15]}
            userData={{ id: "parking" }}
            startGameFn={() => {
              startGameFn("/gameroom1");
            }}
            user={user}
            readyUsers={readyUsers}
            setReadyUsers={setReadyUsers}
            setIsUsersReady={setIsUsersReady}
          />
          <ParkingZone
            rotation={[-Math.PI / 2, 0, 0]}
            position={[20, 0.1, -15]}
            userData={{ id: "parking" }}
            startGameFn={() => {
              startGameFn("/gameroom1");
            }}
            user={user}
            readyUsers={readyUsers}
            setReadyUsers={setReadyUsers}
            setIsUsersReady={setIsUsersReady}
          />
          <ParkingZone
            rotation={[-Math.PI / 2, 0, 0]}
            position={[-36.5, 0.1, 36.5]}
            userData={{ id: "parking" }}
            startGameFn={() => {
              window.location.href = "https://github.com/Bumper-Dosi";
            }}
            user={user}
            readyUsers={readyUsers}
            setReadyUsers={setReadyUsers}
            setIsUsersReady={setIsUsersReady}
          />
          <Sphere position={[20, 20, -5]} userData={{ id: "sphere-1" }} />
          <Sphere position={[25, 20, -20]} userData={{ id: "sphere-2" }} />
          <RedSphere
            position={[-20, 30, 15]}
            userData={{ id: "redsphere-1" }}
          />
          <RedSphere position={[20, 30, 35]} userData={{ id: "redsphere-2" }} />
          <Cat
            position={[-41.5, 0.1, 41.5]}
            rotation={[0, (Math.PI * 3) / 4, 0]}
          />
          <Tree position={[-30, 0, 40]} userData={{ id: "tree-1" }} />
          <Tree position={[-30, 0, 25]} userData={{ id: "tree-2" }} />
          <Tree position={[-37, 0, 30]} userData={{ id: "tree-3" }} />
          <Tree position={[-25, 0, 35]} userData={{ id: "tree-1" }} />
          <Cactus position={[-15, 0, 0]} userData={{ id: "cactus-1" }} />
          <Cactus position={[15, 0, -30]} userData={{ id: "cactus-2" }} />
          <Cactus position={[-17, 0, 2]} userData={{ id: "cactus-3" }} />
          <Bush position={[-13, 0, -20]} userData={{ id: "bush-1" }} />
          <Bush position={[-5, 0, -15]} userData={{ id: "bush-2" }} />
          <Bush position={[3, 0, -20]} userData={{ id: "bush-3" }} />
          <Bush position={[-5, 0, -12]} userData={{ id: "bush-4" }} />
          <Bush position={[5, 0, -12]} userData={{ id: "bush-5" }} />
          <Bush position={[-3, 0, -20]} userData={{ id: "bush-6" }} />
          <Bush position={[5, 0, -15]} userData={{ id: "bush-7" }} />
          <Bush position={[5, 0, -18]} userData={{ id: "bush-8" }} />
          <Bush position={[-7, 0, -20]} userData={{ id: "bush-9" }} />
          <Bush position={[-15, 0, -18]} userData={{ id: "bush-10" }} />
          <Bush position={[-15, 0, -12]} userData={{ id: "bush-11" }} />
          <Bush position={[-5, 0, -18]} userData={{ id: "bush-12" }} />
          <Bush position={[-10, 0, -20]} userData={{ id: "bush-13" }} />
          <Bush position={[-15, 0, -15]} userData={{ id: "bush-14" }} />
          <Bush position={[0, 0, -20]} userData={{ id: "bush-15" }} />
          <Bush position={[15, 0, -12]} userData={{ id: "bush-16" }} />
          <Bush position={[15, 0, -18]} userData={{ id: "bush-17" }} />
          <Bush position={[15, 0, -15]} userData={{ id: "bush-18" }} />
          <Bush position={[13, 0, -20]} userData={{ id: "bush-19" }} />
          <Bush position={[10, 0, -20]} userData={{ id: "bush-20" }} />
          <Bush position={[7, 0, -20]} userData={{ id: "bush-21" }} />
          <Bush position={[17, 0, -20]} userData={{ id: "bush-22" }} />
          <Bush position={[20, 0, -20]} userData={{ id: "bush-23" }} />
          <Bush position={[23, 0, -20]} userData={{ id: "bush-24" }} />
          <Bush position={[25, 0, -12]} userData={{ id: "bush-25" }} />
          <Bush position={[25, 0, -18]} userData={{ id: "bush-26" }} />
          <Bush position={[25, 0, -15]} userData={{ id: "bush-27" }} />
          <RoadSign
            position={[-8, 0, 0]}
            userData={{ id: "ROADWORKS_PREPARE-TO-STOP" }}
          />
          <Spruce position={[-42, 0, 35]} userData={{ id: "spruce-1" }} />
          <Spruce position={[-35, 0, 43]} userData={{ id: "spruce-2" }} />
          <Spruce position={[-20, 0, -11]} userData={{ id: "spruce-3" }} />
          <Box position={[-10, 2, 10]} userData={{ id: "box-1" }} />
          <Box position={[-10, 4, 10]} userData={{ id: "box-2" }} />
          <Box position={[-10, 6, 10]} userData={{ id: "box-3" }} />
          <Box position={[-13, 2, 13]} userData={{ id: "box-4" }} />
          <Box position={[-13, 5, 13]} userData={{ id: "box-5" }} />
          <Box position={[25, 2, 25]} userData={{ id: "box-6" }} />
          <Box position={[25, 5, 25]} userData={{ id: "box-7" }} />
          <Box position={[25, 10, 25]} userData={{ id: "box-8" }} />
          <Box position={[22, 2, 22]} userData={{ id: "box-9" }} />
          <EndWall
            position={[50, 1, 0]}
            args={[10, 10, 100]}
            color={"#E281C7"}
          />
          <EndWall
            position={[0, 1, 50]}
            args={[10, 10, 100]}
            rotation={[0, Math.PI / 2, 0]}
            color={"#E281C7"}
          />
          <EndWall
            position={[-50, 1, 0]}
            args={[10, 10, 100]}
            color={"#E281C7"}
          />
          <EndWall
            position={[0, 1, -50]}
            args={[10, 10, 100]}
            rotation={[0, Math.PI / 2, 0]}
            color={"#E281C7"}
          />
        </Physics>
      </Canvas>
      <TextBox message={"W: Accel"} top={"10%"} />
      <TextBox message={"A/D: Turn"} top={"12%"} />
      <TextBox message={"S: Reverse"} top={"14%"} />
      <TextBox message={"R: Reset"} top={"16%"} />
      <TextBox message={"B: Boost!"} top={"18%"} />
      <TextBox message={"H: Horn"} top={"20%"} />
      <TextBox message={"M: Mute/Unmute"} top={"22%"} />
    </WaitingRoomLayout>
  );
}

export default WaitingRoom;
