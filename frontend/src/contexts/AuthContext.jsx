import React, { createContext, useCallback, useEffect, useState } from "react";
import { backendAPI } from "../index";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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

  const history = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();

    await fetch(backendAPI.concat("token/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value.toLowerCase(),
        password: e.target.password.value,
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
        history("/dashboard");
        window.location.reload(true);
        // console.log(authTokens, user, isAuthenticated);
      })
      .catch((err) => {
        alert(err);
      });

      console.log(authTokens, user, isAuthenticated)
      return ()=>{
        
      }
  };

  const LogoutHandler = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authTokens");
    history("/login_signup");
  }, [history]);

  const updateToken = useCallback(async () => {
    await fetch(backendAPI.concat("token/refresh/"), {
      method: "POST",
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
