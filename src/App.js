import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./config/auth/firebase";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Main from "./components/Main";
import Login from "./components/Login";
import Logout from "./components/Logout";
import GameRoom from "./components/GameRoom";
import BackSVGGame from "./components/GameRoom/BackSVGGame";
import WaitingRoom from "./components/WaitingRoom";

const GameLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const WaitingRoomLayout = styled.div`
  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const BackButton = styled.button`
  padding: 5px;
  position: absolute;
  height: 5%;
  left: 3%;
  border: none;
  background-color: transparent;
  font-weight: bold;
  z-index: 100;
`;

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === true
  );
  const [loginType, setLoginType] = useState(
    window.localStorage.getItem("loginType")
  );
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [hexCode, setHexCode] = useState("");
  const [myData, setMyData] = useState({});
  const [isGameMode, setIsGameMode] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const loginType = await user.providerData[0].providerId.split(".")[0];

        window.localStorage.setItem("auth", true);
        window.localStorage.setItem("loginType", loginType);

        setToken(token);
        setAuth(true);
        setUser(user.uid);
        setLoginType(loginType);
      }
    });
  }, []);

  const backToMain = () => {
    setIsGameMode(false);
    navigate("/");
  };

  return (
    <>
      {auth && (
        <Logout
          setToken={setToken}
          setUser={setUser}
          setAuth={setAuth}
          loginType={loginType}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            auth ? (
              <>
                <Main
                  hexCode={hexCode}
                  setHexCode={setHexCode}
                  user={user}
                  token={token}
                  isGameMode={isGameMode}
                  setIsGameMode={setIsGameMode}
                  myData={myData}
                  setMyData={setMyData}
                  isMute={isMute}
                  setIsMute={setIsMute}
                />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            !auth ? (
              <>
                <WaitingRoomLayout>
                  <WaitingRoom />
                </WaitingRoomLayout>
                <Login
                  setToken={setToken}
                  setUser={setUser}
                  setAuth={setAuth}
                />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/gameroom1"
          element={
            !auth ? (
              <Login setToken={setToken} setUser={setUser} setAuth={setAuth} />
            ) : (
              <GameLayout>
                <BackButton onClick={backToMain}>
                  <BackSVGGame />
                </BackButton>
                <GameRoom
                  hexCode={hexCode}
                  user={user}
                  position={[0, 0, 0]}
                  isGameMode={isGameMode}
                  setIsGameMode={setIsGameMode}
                  myData={myData}
                  setMyData={setMyData}
                  isMute={isMute}
                  setIsMute={setIsMute}
                />
              </GameLayout>
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
