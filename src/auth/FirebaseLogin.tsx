import { useState } from "react";
import {
  loginWithGoogle,
  loginWithGithub,
  logoutUser
} from "../auth";
import api from "../api";

function FirebaseLogin() {
  const [user, setUser] = useState(null);

  const handleGoogle = async () => {
    const res = await loginWithGoogle();
    setUser(res.user);
  };

  const handleGithub = async () => {
    const res = await loginWithGithub();
    setUser(res.user);
  };

  const getProfile = async () => {
    const token = await window.firebaseAuth?.currentUser?.getIdToken();

    const res = await api.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Firebase Auth System</h1>

      {!user ? (
        <>
          <button onClick={handleGoogle}>
            Login with Google
          </button>

          <button onClick={handleGithub}>
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <h3>Welcome</h3>
          <p>{user.email}</p>

          <button onClick={getProfile}>
            Call Protected API
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default FirebaseLogin;