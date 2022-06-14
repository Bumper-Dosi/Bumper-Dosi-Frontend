import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import Countdown from "../Countdown";
import { TIME, FONT_SIZE } from "../../constants";

const appear = keyframes`
  0% {
    top: 0%;
  }
  10% {
    top: 7%
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const MatchResultModalLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 350px;
  border-radius: 10px;
  padding: 10px 10px;
  font-family: "Arial Black", sans-serif;
  font-size: 40px;
  text-align: center;
  opacity: 0.8;
  background-color: rgba(246, 247, 248, 0.8);
  box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%),
    0px 2px 5px -2px rgba(0, 0, 0, 0.418), 0px 2px 5px -7px rgb(0 0 0 / 20%);
  z-index: 4;
  transform: translate(-50%, -50%);
  animation: ${appear};
`;

const TotalNumberContent = styled.div`
  padding: 10px;
  text-align: center;
`;

function MatchResultModal({ totalNumber }) {
  return (
    <MatchResultModalLayout className="match-result-modal">
      Match-Result
      <TotalNumberContent>{totalNumber}</TotalNumberContent>
      <Countdown
        count={TIME.RANKING_DURATION_TIME}
        fontSize={FONT_SIZE.AFTER_GAME}
        top={"90%"}
        left={"50%"}
      />
    </MatchResultModalLayout>
  );
}

export default MatchResultModal;
