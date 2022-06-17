import React from "react";
import styled from "styled-components";

const BoostLayout = styled.div`
  position: absolute;
  left: 10%;
  top: 10%;
  z-index: 100;
  width: 500px;
  height: 100px;
`;

const BoostBox = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 15px;
  background-color: #ffb131;
  font-size: 0.8rem;
`;

const BoostContent = styled.div`
  width: ${(props) => props.width};
  height: 30px;
  padding: 20px 0;
  border-radius: 15px;
  background-color: #ffb131;
  font-size: 30px;
  font-weight: bolder;
  text-align: center;
  letter-spacing: 15px;
`;

function Boost({ boostTime }) {
  const boostPercent = `${Math.floor(boostTime / 12)}%`;
  const boostNumber = Math.floor(boostTime / 3);

  return (
    <BoostLayout style={{ width: boostPercent }}>
      <BoostBox>
        <BoostContent>Boost:{boostNumber}%</BoostContent>
      </BoostBox>
    </BoostLayout>
  );
}

export default Boost;
