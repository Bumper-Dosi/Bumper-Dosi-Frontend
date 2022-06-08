import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./config/auth/firebase";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Logout from "./components/Logout";
import FriendList from "./components/FriendList";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === true,
  );
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        window.localStorage.setItem("auth", true);
        setToken(token);
        setAuth(true);
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={auth ? <Main token={token} /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={
            !auth ? (
              <Login setToken={setToken} setUser={setUser} setAuth={setAuth} />
            ) : (
              <Main token={token} />
            )
          }
        />
      </Routes>
      {auth && (
        <Logout setToken={setToken} setUser={setUser} setAuth={setAuth} />
      )}
    </>
  );
}

export default App;
