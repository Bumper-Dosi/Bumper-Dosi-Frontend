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
  text-shadow: 0px 0px 4px #ccc, 0px -5px 4px #ff3, 2px -10px 6px #fd3,
    -2px -15px 11px #f80;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  animation: ${fade} 1s linear infinite;
`;

function Countdown({ count, counting, fontSize }) {
  const [countdownTime, setCountdownTime] = useState();
  const countdownRef = useRef(count);

  useEffect(() => {
    setInterval(() => {
      setCountdownTime((countdownRef.current -= 1));
    }, 1000);

    return clearInterval();
  }, []);

  useEffect(() => {
    if (countdownTime === 0) {
      counting(false);
    }
  }, [countdownTime]);

  return (
    <CountdownLayout style={{ fontSize: `${fontSize}` }}>
      {countdownTime}
    </CountdownLayout>
  );
}

export default Countdown;
