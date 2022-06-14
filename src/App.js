import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./config/auth/firebase";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Logout from "./components/Logout";
import GameRoom from "./components/models/GameRoom";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === true
  );
  const [loginType, setLoginType] = useState(
    window.localStorage.getItem("loginType")
  );
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [hexCode, setHexCode] = useState();

  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const loginType = await user.providerData[0].providerId.split(".")[0];

        window.localStorage.setItem("auth", true);
        window.localStorage.setItem("loginType", loginType);
        console.log(loginType);
        setToken(token);
        setAuth(true);
        setUser(user.uid);
        setLoginType(loginType);
      }
    });
  }, []);

  return (
    <>
      {auth && (
        <Logout setToken={setToken} setUser={setUser} setAuth={setAuth} loginType={loginType} />
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
              <GameRoom hexCode={hexCode} user={user} position={[0, 0, 0]} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
