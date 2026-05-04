import { auth, googleProvider, githubProvider, signInWithPopup } from "./firebase";
import api from "./api";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const token = await result.user.getIdToken();

  const res = await api.post("/auth/sync", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const loginWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);

  const token = await result.user.getIdToken();

  const res = await api.post("/auth/sync", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const logoutUser = async () => {
  await auth.signOut();
};