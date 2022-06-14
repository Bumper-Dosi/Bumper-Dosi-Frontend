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
  z-index: 100;
`;

function Countdown({ count, setCount, fontSize, top, left }) {
  const [countdownTime, setCountdownTime] = useState(count);
  const countdownRef = useRef(count);
  const intervalId = useRef(null);

  useEffect(() => {
    if (countdownTime === 0) {
      setCount(false);
    }
  }, [countdownTime]);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCountdownTime(--countdownRef.current);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <CountdownLayout
      style={{ fontSize: `${fontSize}`, top: `${top}`, left: `${left}` }}
    >
      {countdownTime}
    </CountdownLayout>
  );
}

export default Countdown;
