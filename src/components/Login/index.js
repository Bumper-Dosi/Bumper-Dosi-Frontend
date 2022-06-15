import React from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { loginWithGithub, loginWithGoogle } from "../../config/auth/logService";
import styled from "styled-components";

import { COLOR } from "../../constants";
import GitHubSVG from "./SVG/GithubSVG";
import GoogleSVG from "./SVG/GoogleSVG";
import Title from "../models/Title";

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const LoginRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;

  width: 500px;
  height: 350px;

  border-radius: 10px;
`;

const TitleHeader = styled.header`
  font-size: 70px;
  color: ${COLOR.BACKGROUND_COLOR};
`;

const ButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 250px;
  height: 200px;

  #google {
    background-color: #ffffff;
  }

  #github {
    color: white;
    background-color: black;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 250px;
  height: 40px;

  border-radius: 5px;
`;

function Login({ setToken, setUser, setAuth }) {
  const navigate = useNavigate();
  const onClick = async (e) => {
    const target = e.currentTarget.id;

    if (target === "google") {
      const loginResult = await loginWithGoogle(setToken, setUser, setAuth);

      if (loginResult.status === 200) navigate("/");
    }

    if (target === "github") {
      const loginResult = await loginWithGithub(setToken, setUser, setAuth);

      if (loginResult.status === 200) navigate("/");
    }
  };

  return (
    <>
      <LoginLayout>
        <Canvas>
          <pointLight
            castShadow
            position={[10, 8, 5]}
            intensity={1.4}
            shadow-mapSize-width={1400}
            shadow-mapSize-height={1400}
            shadowCameraFar={50}
          />
          <pointLight
            castShadow
            position={[-10, 8, 5]}
            intensity={1.4}
            shadow-mapSize-width={1400}
            shadow-mapSize-height={1400}
            shadowCameraFar={50}
          />
          <Title />
        </Canvas>
        <LoginRow>
          <ButtonSection>
            <ButtonBox id="google" onClick={onClick}>
              <GoogleSVG />
              <span>Sign in with Google</span>
            </ButtonBox>
            <ButtonBox id="github" onClick={onClick}>
              <GitHubSVG />
              <span>Sign in with GitHub</span>
            </ButtonBox>
          </ButtonSection>
        </LoginRow>
      </LoginLayout>
    </>
  );
}

export default Login;
