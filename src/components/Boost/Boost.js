import React from "react";
import styled from "styled-components";

const BoostContainer = styled.div`
  position: absolute;
  left: 10%;
  top: 10%;
  width: 400px;
  height: 70px;
  background: #eee;
  opacity: 0.8;
  border-radius: 15px;
  z-index: 100;
`
const BoostLayout = styled.div`
`;

const BoostBox = styled.div`
  border-radius: 15px;
  background-color: #ffb131;
  font-size: 0.8rem;
`;

const BoostContent = styled.div`
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
  const boostPercent = `${Math.floor(boostTime / 3)}%`;
  const boostNumber = Math.floor(boostTime / 3);

  return (
    <BoostContainer>
      <BoostLayout style={{ width: boostPercent }}>
        <BoostBox>
          <BoostContent>Boost:{boostNumber}%</BoostContent>
        </BoostBox>
      </BoostLayout>
    </BoostContainer>
  );
}

export default Boost;
