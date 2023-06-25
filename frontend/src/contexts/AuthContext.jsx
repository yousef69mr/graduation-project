import React, { createContext, useCallback, useEffect, useState } from "react";
import api from "../axios";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  // const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    localStorage.getItem("authTokens") ? true : false
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();
    const cancelToken = axios.CancelToken.source();
    try {
      const formData = new FormData();
      formData.append("email", e.target.email.value.toLowerCase());
      formData.append("password", e.target.password.value);

      const loginResponse = await api.api.post("token/", formData, {
        cancelToken: cancelToken.token,
      });

      if (loginResponse.status === 200) {
        setIsAuthenticated(true);
        setAuthTokens(loginResponse.data);
        setUser(jwt_decode(loginResponse.data.access));
        localStorage.setItem("authTokens", JSON.stringify(loginResponse.data));
        // navigate("/dashboard");
        window.location.reload(true);
        // console.log(authTokens, user, isAuthenticated);
      } else {
        throw new Error(loginResponse.statusText);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("Request cancelled");
      } else {
        console.error(error);
      }
    }

    console.log(authTokens, user, isAuthenticated);
    return () => {
      cancelToken.cancel("cancelled");
    };
  };

  const LogoutHandler = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authTokens");
    navigate("/login_signup");
  }, [navigate]);

  const updateToken = useCallback(async () => {
    await api.api
      .post("token/refresh/", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: authTokens?.refresh,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setIsAuthenticated(true);
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      })
      .catch((err) => {
        LogoutHandler();
      });
  }, [authTokens, LogoutHandler]);

  useEffect(() => {
    let minutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, minutes);
    return () => clearInterval(interval);
  }, [authTokens, updateToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        activeUser: user,
        loginUser: LoginHandler,
        logoutUser: LogoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
