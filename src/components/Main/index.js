import React from "react";
import { useState } from "react";
import WaitingRoom from "../WaitingRoom/WaitingRoom";
import FriendList from "../FriendList";

function Main({ token }) {
  // const [token, setToken] = useState(null);
  const [isFriendListOpened, setIsFriendListOpened] = useState(false);

  return (
    <>
      <WaitingRoom setIsFriendListOpened={setIsFriendListOpened} />
      {isFriendListOpened && (
        <FriendList token={token} setIsFriendListOpened={setIsFriendListOpened} />
      )}
    </>
  );
}

export default Main;
