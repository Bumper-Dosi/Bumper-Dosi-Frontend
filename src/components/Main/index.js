import React, { useEffect, useState } from "react";
import WaitingRoom from "../WaitingRoom/WaitingRoom";
import getRandomHexNumber from "../../utils/getRandomHex";

function Main() {
  const [hexCode, setHexCode] = useState();
  const randomHex = getRandomHexNumber();

  useEffect(() => {
    setHexCode(randomHex);
  }, []);

  return (
    <>
      <WaitingRoom hexCode={hexCode} />
    </>
  );
}

export default Main;
