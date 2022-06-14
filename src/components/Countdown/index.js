import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

const fade = keyframes`
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;

const CountdownLayout = styled.div`
  position: absolute;
  font-size: ${(props) => props.fontSize};
  font-family: "Arial Black", sans-serif;
  color: #000;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translate(-50%, -50%);
  animation: ${fade} 1s linear infinite;
`;

function Countdown({ count, counting, fontSize, top, left }) {
  const [countdownTime, setCountdownTime] = useState(count);
  const countdownRef = useRef(countdownTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdownTime((countdownRef.current -= 1));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (countdownTime === 0) {
      counting(false);
    }
  }, [countdownTime]);

  return (
    <CountdownLayout
      style={{ fontSize: `${fontSize}`, top: `${top}`, left: `${left}` }}
    >
      {countdownTime}
    </CountdownLayout>
  );
}

export default Countdown;
