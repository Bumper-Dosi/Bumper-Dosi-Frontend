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

        window.localStorage.setItem("auth", true);
        setToken(token);
        setAuth(true);
        setUser(user.uid);
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
        <Logout setToken={setToken} setUser={setUser} setAuth={setAuth} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            auth ? (
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
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            !auth ? (
              <Login setToken={setToken} setUser={setUser} setAuth={setAuth} />
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
              <>
                <BackButton
                  type="button"
                  onClick={() => {
                    backToMain();
                  }}
                >
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
              </>
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
