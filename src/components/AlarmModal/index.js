import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { TIME } from "../../constants";

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

const DeleteButton = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 15px;
  color: red;
  cursor: pointer;
`;

const AlarmModalLayout = styled.div`
  position: absolute;
  top: 7%;
  left: 50%;
  width: 200px;
  height: 80px;
  border-radius: 10px;
  padding: 10px 10px;
  font-family: "Arial Black", sans-serif;
  opacity: 0.8;
  background-color: rgba(246, 247, 248, 0.8);
  box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%),
    0px 2px 5px -2px rgba(0, 0, 0, 0.418), 0px 2px 5px -7px rgb(0 0 0 / 20%);
  z-index: 4;
  transform: translate(-50%, -50%);
  animation: ${appear} 8s ease-in-out;
`;

const AlarmModalContent = styled.div`
  text-align: center;
  padding: 10px;
`;

function AlarmModal({ openModal, message }) {
  const [countdownTime, setCountdownTime] = useState(TIME.MODAL_DURATION_TIME);
  const countdownRef = useRef(TIME.MODAL_DURATION_TIME);

  const handleCloseModal = () => {
    openModal(false);
  };

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
      openModal(false);
    }
  }, [countdownTime]);

  return (
    <AlarmModalLayout className="alarm-modal" onClick={handleCloseModal}>
      <DeleteButton>X</DeleteButton>
      <AlarmModalContent>{message}</AlarmModalContent>
    </AlarmModalLayout>
  );
}

export default AlarmModal;
