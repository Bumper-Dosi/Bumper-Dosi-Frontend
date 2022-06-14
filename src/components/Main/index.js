import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WaitingRoom from "../WaitingRoom";
import FriendList from "../FriendList";
import getRandomHexNumber from "../../utils/getRandomHex";
import styled from "styled-components";
import FriendIconSVG from "./SVG/FriendIconSVG";
import AlarmModal from "../AlarmModal";

const MainLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const OpenButton = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 10;
  padding: 5px;
`;

function Main({
  token,
  user,
  hexCode,
  setHexCode,
  isGameMode,
  setIsGameMode,
  myData,
  setMyData,
  isMute,
  setIsMute,
}) {
  const [isFriendListOpened, setIsFriendListOpened] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState("Welcome");
  const randomHex = getRandomHexNumber();
  const navigate = useNavigate();

  const startGame = (url) => {
    setIsGameMode(true);
    navigate(url);
  };

  useEffect(() => {
    setIsAlarmOpen(true);
  }, [alarmMessage]);

  useEffect(() => {
    setHexCode(randomHex);
  }, []);

  return (
    <MainLayout>
      {isAlarmOpen && (
        <AlarmModal setOpenModal={setIsAlarmOpen} message={alarmMessage} />
      )}
      <WaitingRoom
        hexCode={hexCode}
        user={user}
        startGameFn={startGame}
        isGameMode={isGameMode}
        setIsGameMode={setIsGameMode}
        myData={myData}
        setMyData={setMyData}
        isMute={isMute}
        setIsMute={setIsMute}
      />
      {isFriendListOpened ? (
        <FriendList
          user={user}
          token={token}
          setIsFriendListOpened={setIsFriendListOpened}
          setAlarmMessage={setAlarmMessage}
        />
      ) : (
        <OpenButton>
          <FriendIconSVG
            onClick={() => {
              setIsFriendListOpened(true);
            }}
          />
        </OpenButton>
      )}
    </MainLayout>
  );
}

export default Main;
