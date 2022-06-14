import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Stats, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

import Light from "../models/Light";
import Vehicle from "../models/Vehicle";
import EndWall from "../models/EndWall";
import MatchResultModal from "../MatchResultModal";
import OtherUserVehicle from "../models/OtherUserVehicle";

import DesertPlane from "../models/DesertPlane";
import DesertRocks from "../models/DesertRocks";

import { TIME, FONT_SIZE } from "../../constants";
// import Cactus from "./Cactus";
// import getRandomNumber from "../../utils/getRandomNumber";
// import Scorpion from "./Scorpion";
// import Bones from "./Bones";

function GameRoom({
  hexCode,
  user,
  isGameMode,
  setIsGameMode,
  myData,
  setMyData,
  isMute,
  setIsMute,
}) {
  const [otherUsers, setOtherUsers] = useState([]);
  const [disconnectedSocketId, setDisconnectedSocketId] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMyEnergyEmpty, setIsMyEnergyEmpty] = useState(false);
  const navigate = useNavigate();

  const handleMoveMainPage = (url) => {
    navigate(url);
  };

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "m") {
        setIsMute((prev) => !prev);
      }
    });
  }, []);

  useEffect(() => {
    if (myData.energy <= 0) {
      setIsGameOver(true);
      setTimeout(() => {
        handleMoveMainPage("/");
        setIsGameMode(false);
      }, 10000);
    }
  }, [isMyEnergyEmpty]);

  const updateOtherUsers = (userInfo) => {
    if (!userInfo) return;

    setOtherUsers((prev) => prev.concat(userInfo));
  };

  const updateOtherUserPosition = (data) => {
    if (!data) return;
    if (!otherUsers.find((element) => element.socketId === data.socketId))
      return;

    const updatedOtherUsers = otherUsers.map((element) => {
      return element.socketId === data.socketId
        ? { ...element, ...data }
        : element;
    });

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
    <>
      <div style={{ width: "99vw", height: "98vh" }}>
        {isGameOver && (
          <MatchResultModal
            killCount={myData.killCount}
            setIsGameOver={setIsGameOver}
          />
        )}
        <Canvas shadows flat linear>
          <color attach="background" args={["#171720"]} />
          <fog attach="fog" args={["#ffffff", 30, 150]} />
          <Stats />
          <Stars />
          <Light />
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
              setIsMyEnergyEmpty={setIsMyEnergyEmpty}
            />
            {otherUsers.length > 0 &&
              otherUsers.map((otherUser) => (
                <OtherUserVehicle
                  user={otherUser}
                  key={otherUser.socketId}
                  isGameMode={isGameMode}
                  userData={{ id: `${otherUser.user}` }}
                />
              ))}
            <DesertRocks />
            {/* <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Bones
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[-Math.PI / 2, 0, -Math.PI * getRandomNumber(-2, 2)]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Scorpion
              position={[getRandomNumber(-60, 60), 1, getRandomNumber(-60, 60)]}
              rotation={[0, Math.PI * getRandomNumber(-2, 2), 0]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            />
            <Cactus
              position={[getRandomNumber(-60, 60), 0, getRandomNumber(-60, 60)]}
            /> */}
            <DesertPlane
              elementSize={(150 * 1) / 128}
              position={[-150 / 2, -1, 150 / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <EndWall position={[70, 1, 0]} args={[10, 10, 130]} />
            <EndWall
              position={[0, 1, 70]}
              args={[10, 10, 130]}
              rotation={[0, Math.PI / 2, 0]}
            />
            <EndWall position={[-70, 1, 0]} args={[10, 10, 130]} />
            <EndWall
              position={[0, 1, -70]}
              args={[10, 10, 130]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}

export default GameRoom;
