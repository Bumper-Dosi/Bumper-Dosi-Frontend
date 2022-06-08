import React, { useEffect, useState } from "react";
import WaitingRoom from "../WaitingRoom";
import FriendList from "../FriendList";
import getRandomHexNumber from "../../utils/getRandomHex";
import styled from "styled-components";

const MainLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const OpenButton = styled.div`
  position: absolute;
  top: 95%;
  right: 95%;
  z-index: 10;
  padding: 5px;
  font-weight: bold;
  font-size: 20px;
  color: green;
`;

function Main({ token, user }) {
  const [isFriendListOpened, setIsFriendListOpened] = useState(false);
  const [hexCode, setHexCode] = useState();
  const randomHex = getRandomHexNumber();

  useEffect(() => {
    setHexCode(randomHex);
  }, []);

  return (
    <MainLayout>
      <WaitingRoom hexCode={hexCode} />
      {isFriendListOpened ? (
        <FriendList
          user={user}
          token={token}
          setIsFriendListOpened={setIsFriendListOpened}
        />
      ) : (
        <OpenButton
          type="button"
          onClick={() => {
            setIsFriendListOpened(true);
          }}
        >
          list
        </OpenButton>
      )}
    </MainLayout>
  );
}

export default Main;
