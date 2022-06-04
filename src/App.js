import { useState, useEffect, } from "react";
import {
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";

import { authService } from "./config/firebase";

function App() {
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === true);
  const [token, setToken] = useState("");

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

  const loginWithGoogle = async () => {
    const user = await signInWithPopup(authService, new GoogleAuthProvider());

    if (user) {
      window.localStorage.setItem("auth", true);
      setAuth(true);
    }
  }

  const loginWithGithub = async () => {
    const user = await signInWithPopup(authService, new GithubAuthProvider());

    if (user) {
      window.localStorage.setItem("auth", true);
      setAuth(true);
    }
  }

  const logout = async () => {
    try {
      await signOut(authService);

      setToken("");
      setAuth(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      { auth ? (
          <button onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <button onClick={loginWithGoogle}>
              Login with Google
            </button><button onClick={loginWithGithub}>
              Login with Github
            </button>
          </>
        )
      }
    </>
  );
}

export default App;
