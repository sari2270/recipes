import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = React.createContext({
  user: null,
  isLoggedIn: false,
  register: (user) => {},
  login: (user) => {},
  logout: () => {},
  customAxios: () => {},
  registerError: [],
  loginError: [],
});
const baseUrl = process.env.REACT_APP_BASE_URL;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState([]);
  const [loginError, setLoginError] = useState([]);

  useEffect(() => {
    const localStorageHandler = async () => {
      const LSuser = JSON.parse(localStorage.getItem("user"));
      if (LSuser) {
        setUser(LSuser);
        await refreshToken();
      }
    };
    localStorageHandler();
  }, []);

  const refreshToken = async () => {
    try {
      const LSuser = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(`${baseUrl}auth/refresh`, {
        token: user?.refreshToken || LSuser.refreshToken,
      });
      const updatedUser = {
        ...(LSuser || user),
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
      setUser({ ...updatedUser });

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
  const customAxios = () => {
    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
      async (config) => {
        let currentDate = new Date();
        const decodedToken = jwt_decode(user.accessToken);

        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken();
          config.headers["authorization"] = "bearer " + data.accessToken;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    return axiosJWT;
  };

  const registerHandler = async (user) => {
    let errorR = [];
    setIsLoading(true);
    setRegisterError([]);
    try {
      await axios.put(`${baseUrl}auth/register`, user);
      loginHandler(user);
      return errorR;
    } catch (error) {
      setRegisterError((prev) => [...prev, error?.response?.data?.errors]);
      errorR = [error?.response?.data?.errors];
      setIsLoading(false);
      return errorR;
    }
  };
  const loginHandler = async (user) => {
    let errorL = [];
    setIsLoading(true);
    setLoginError([]);
    try {
      const response = await axios.post(`${baseUrl}auth/login`, user);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setIsLoading(false);
      return errorL;
    } catch (error) {
      setLoginError((prev) => [...prev, error?.response?.data?.errors]);
      errorL = [error?.response?.data?.errors];
      setIsLoading(false);
      return errorL;
    }
  };

  const logoutHandler = async () => {
    try {
      await customAxios().delete(`${baseUrl}auth/logout`, {
        data: { refreshToken: user.refreshToken },
        headers: { authorization: "bearer " + user.accessToken },
      });
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error(err);
    }
  };

  const contextValue = {
    user: user,
    isLoggedIn: !!user?.firstName,
    registerError: registerError,
    loginError: loginError,
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler,
    customAxios: customAxios,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
