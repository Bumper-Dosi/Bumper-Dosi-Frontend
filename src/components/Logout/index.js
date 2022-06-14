import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../config/auth/logService";
import GoogleSVG from "../Login/SVG/GoogleSVG";
import GitHubSVG from "../Login/SVG/GithubSVG";

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

function Logout({ setToken, setUser, setAuth, loginType }) {
  const navigate = useNavigate();
  const onClick = () => {
    logout(setAuth, setUser, setToken);
    navigate("/login");
  };

  return (
    <LogoutLayout onClick={onClick}>
      {(loginType === "github") && (
        <GitHubSVG />
      )}
      {(loginType === "google") && (
        <GoogleSVG />
      )}
      Logout
    </LogoutLayout>
  );
}

export default Logout;
