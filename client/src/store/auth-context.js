// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";

// const baseUrl = "http://localhost:8080"
// //request interceptor to add the auth token header to requests
// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["x-auth-token"] = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// //response interceptor to refresh token on receiving token expired error
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;
//     let refreshToken = localStorage.getItem("refreshToken");

//     if (
//       refreshToken &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       return axios
//         .post(`${baseUrl}/auth/refresh_token`, { refreshToken: refreshToken })
//         .then((res) => {
//           if (res.status === 200) {
//             localStorage.setItem("accessToken", res.data.accessToken);
//             console.log("Access token refreshed!");
//             return axios(originalRequest);
//           }
//         });
//     }
//     return Promise.reject(error);
//   }
// );

// let logoutTimer;
// const AuthContext = React.createContext({
//   display: "hide",
//   user: null,
//   token: "",
//   isLoggedIn: false,
//   register: (body) => {},
//   login: (body) => {},
//   refreshToken: (body) => {},
//   logout: (body) => {},
//   getProtected: () => {},
// });

// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const ajdExpirationTime = new Date(expirationTime).getTime();
//   const remainingDuration = ajdExpirationTime - currentTime;
//   return remainingDuration;
// };

// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedExpirationDate = localStorage.getItem("expirationTime");

//   const remainingTime = calculateRemainingTime(storedExpirationDate);

//   if (remainingTime <= 60000) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     return null;
//   }
//   return { token: storedToken, duration: remainingTime };
// };

// export const AuthContextProvider = ({ children }) => {
//   const tokenData = retrieveStoredToken();
//   let initialToken;
//   if (tokenData) {
//     initialToken = tokenData.token;
//   }
//   const [token, setToken] = useState(initialToken);
//   const userIsLoggedIn = !!token;

//   const logoutHandler = useCallback(() => {
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     if (logoutTimer) {
//       clearTimeout(logoutTimer);
//     }
//   }, []);

//   const loginHandler = (token, expirationTime) => {
//     setToken(token);
//     localStorage.setItem("token", token);
//     localStorage.setItem("expirationTime", expirationTime);
//     const remainingTime = calculateRemainingTime(expirationTime);
//     logoutTimer = setTimeout(logoutHandler, remainingTime);
//   };

//   useEffect(() => {
//     if (tokenData) {
//       console.log(tokenData.duration);
//       logoutTimer = setTimeout(logoutHandler, tokenData.duration);
//     }
//   }, [tokenData, logoutHandler]);

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     // login: loginHandler,
//     // logout: logoutHandler,
//     display: "hide",
//   user: null,
//     register: (body) => {
//       return axios.post(`${baseUrl}/auth/register`, body);
//     },
//     login: (body) => {
//       return axios.post(`${baseUrl}/auth/login`, body);
//     },
//     refreshToken: (body) => {
//       return axios.post(`${baseUrl}/auth/refresh_token`, body);
//     },
//     logout: (body) => {
//       return axios.delete(`${baseUrl}/auth/logout`, body);
//     },
//     getProtected: () => {
//       return axios.get(`${baseUrl}/auth/protected_resource`);
//     },
//   };
//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthContext;

import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const ajdExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = ajdExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  return { token: storedToken, duration: remainingTime };
};

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [])

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
