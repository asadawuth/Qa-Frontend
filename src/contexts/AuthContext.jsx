import { createContext, useEffect, useState } from "react";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "./../utils/Localstorage";
import axios from "../config/axios";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthuser] = useState(null); // id1 data key:values ต่างๆ
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/auth/me")
        .then((res) => {
          setAuthuser(res.data.user);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (registerInputObj) => {
    try {
      const res = await axios.post("/auth/register", registerInputObj);
      addAccessToken(res.data.accessToken);
      setAuthuser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (credential) => {
    const res = await axios.post("/auth/login", credential);
    addAccessToken(res.data.accessToken);
    setAuthuser(res.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthuser(null);
  };

  const changePassword = async (changePasswordInputObj) => {
    try {
      const res = await axios.patch(
        "/auth/changepassword",
        changePasswordInputObj
      );
      setAuthuser(res.data.user);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post("/auth/forgotpassword", email);
      //alert("sucess");
      //addAccessToken(res.data.accessToken);
      setAuthuser(res.data.user);
      console.log(res);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (resetPasswordInputObj) => {
    try {
      const res = await axios.patch(
        "/auth/resetPassword",
        resetPasswordInputObj
      );
      setAuthuser(res.data.user);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const updataProfile = async (dataProfile) => {
    const res = await axios.patch("/user", dataProfile);
    setAuthuser({ ...authUser, ...res.data });
  };

  // res {
  //   "profileWebsite": "https://res.cloudinary.com/dlqp6n6mk/image/upload/v1716580138/hj9m7dbtywwibmgoiqp8.jpg"
  // }

  const setProfileDefaults = async () => {
    await axios.patch("user/defaultprofile");
    setAuthuser({ ...authUser, ...res.data });
  };

  const updateUserData = async (updataInputObj) => {
    try {
      const res = await axios.patch("/user/updatedata", updataInputObj);
      setAuthuser({ ...authUser, ...res.data });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        changePassword,
        forgotPassword,
        resetPassword,
        updataProfile,
        setProfileDefaults,
        updateUserData,
        loading,
        authUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
