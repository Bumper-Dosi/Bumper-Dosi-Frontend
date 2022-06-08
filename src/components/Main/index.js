import React, { useEffect, useState } from "react";
import WaitingRoom from "../WaitingRoom/WaitingRoom";
import FriendList from "../FriendList";
import getRandomHexNumber from "../../utils/getRandomHex";

function Main({ token }) {
  const [isFriendListOpened, setIsFriendListOpened] = useState(false);
  const [hexCode, setHexCode] = useState();
  const randomHex = getRandomHexNumber();

  useEffect(() => {
    setHexCode(randomHex);
  }, []);

  return (
    <>
      <WaitingRoom setIsFriendListOpened={setIsFriendListOpened} hexCode={hexCode} />
      {isFriendListOpened && (
        <FriendList token={token} setIsFriendListOpened={setIsFriendListOpened} />
      )}
    </>
  );
}

export default Main;
