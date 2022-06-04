import React from "react";
import styled from "styled-components";
import { logout } from "../../config/auth/logService";
import GoogleSVG from "../Login/SVG/GoogleSVG";
import { useNavigate } from "react-router-dom";

const LogoutLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -100;
`;

const LogoutRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 20px;
  right: 10px;

  width: 100px;
  height: 40px;

  background-color: #ffffff;
`;

function Logout({ setToken, setUser, setAuth }) {
  const navigate = useNavigate();
  const onClick = () => {
    logout(setAuth, setUser, setToken);
    navigate("/login");
  };

  return (
    <LogoutLayout>
      <LogoutRow onClick={onClick}>
        <GoogleSVG />
        Logout
      </LogoutRow>
    </LogoutLayout>
  );
}

export default Logout;
