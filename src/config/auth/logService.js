import { authService } from "./firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import axios from "axios";

export async function loginWithGoogle(setToken, setUser, setAuth) {
  const loginResult = await signInWithPopup(
    authService,
    new GoogleAuthProvider()
  );

  if (loginResult) {
    window.localStorage.setItem("auth", true);
    setAuth(true);

    const token = loginResult.user.accessToken;
    const uid = loginResult.user.uid;
    const result = await axios({
      method: "post",
      url: "http://localhost:8000/signup",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        uid,
      },
    });

    setToken(token);
    setUser(uid);

    return result;
  }
}

export async function loginWithGithub(setToken, setUser, setAuth) {
  const loginResult = await signInWithPopup(
    authService,
    new GithubAuthProvider()
  );

  if (loginResult) {
    window.localStorage.setItem("auth", true);
    setAuth(true);

    const token = loginResult.user.accessToken;
    const uid = loginResult.user.uid;
    const result = await axios({
      method: "post",
      url: "http://localhost:8000/signup",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        uid,
      },
    });

    setToken(token);
    setUser(uid);

    return result;
  }
}

export async function logout(setToken, setUser, setAuth) {
  try {
    await signOut(authService);

    setToken(null);
    setUser(null);
    setAuth(false);
  } catch (error) {
    console.error(error);
  }
}
