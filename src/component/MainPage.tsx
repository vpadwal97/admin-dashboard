import { Outlet, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [profile, setProfile] = useState();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const resp = await API.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      await localStorage.removeItem("userType");
      await localStorage.removeItem("accessToken");
      if (resp?.data?.message) {
        alert(resp?.data?.message);
      }

      navigate("/login", { replace: true });
    } catch (error) {
      if (error?.message) {
        alert(error.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      const resp = await API.get("/api/profile");
      if (resp?.data) {
        setProfile(resp?.data);
      }
    };
    getProfile();
  }, []);

  return (
    <>
      <div className="container flex align-items-center justify-content-between p-3">
        <h1 className="my-2">Management site</h1>
        <button onClick={onSubmit}>Log out</button>
      </div>
      <hr />
      {profile && JSON.stringify(profile)}
      <Outlet />
    </>
  );
};

export default MainPage;
