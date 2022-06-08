import React from "react";
import styled from "styled-components";
import { logout } from "../../config/auth/logService";
import GoogleSVG from "../Login/SVG/GoogleSVG";
import { useNavigate } from "react-router-dom";

const LogoutLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 20px;
  right: 10px;

  width: 100px;
  height: 40px;

  z-index: 10;
`;

function Logout({ setToken, setUser, setAuth }) {
  const navigate = useNavigate();
  const onClick = () => {
    logout(setAuth, setUser, setToken);
    navigate("/login");
  };

  return (
    <LogoutLayout onClick={onClick}>
      <GoogleSVG />
      Logout
    </LogoutLayout>
  );
}

export default Logout;
