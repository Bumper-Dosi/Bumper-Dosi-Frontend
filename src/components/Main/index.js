import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WaitingRoom from "../WaitingRoom";
import FriendList from "../FriendList";
import getRandomHexNumber from "../../utils/getRandomHex";
import styled from "styled-components";
import FriendIconSVG from "./SVG/FriendIconSVG";

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

function Main({ token, user }) {
  const [isFriendListOpened, setIsFriendListOpened] = useState(false);
  const [hexCode, setHexCode] = useState();
  const randomHex = getRandomHexNumber();

  const navigate = useNavigate();
  const startGame = (url) => {
    navigate(url);
  };

  useEffect(() => {
    setHexCode(randomHex);
  }, []);

  return (
    <MainLayout>
      <WaitingRoom hexCode={hexCode} startGameFn={startGame} />
      {isFriendListOpened ? (
        <FriendList
          user={user}
          token={token}
          setIsFriendListOpened={setIsFriendListOpened}
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
