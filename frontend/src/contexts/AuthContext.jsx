import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import api_root from "../axios";

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

      const loginResponse = await api_root.api.post("token/", formData, {
        cancelToken: cancelToken.token,
      });

      if (loginResponse.status === 200) {
        setIsAuthenticated(true);
        setAuthTokens(loginResponse.data);
        // setUser(jwt_decode(loginResponse.data.access));
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
        alert(error);
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
    navigate("/");
  }, [navigate]);

  // const updateToken = useCallback(async () => {
  //   const cancelToken = axios.CancelToken.source();
  //   const formData = new FormData();
  //   formData.append("refresh", authTokens?.refresh);

  //   await api.api
  //     .post("token/refresh/", formData, { cancelToken: cancelToken.token })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setIsAuthenticated(true);
  //       setAuthTokens(data);
  //       setUser(jwt_decode(data.access));
  //       localStorage.setItem("authTokens", JSON.stringify(data));
  //     })
  //     .catch((err) => {
  //       LogoutHandler();
  //     });
  //   return () => {
  //     cancelToken.cancel("cancelled");
  //   };
  // }, [authTokens, LogoutHandler]);

  useEffect(() => {
    let cancelToken;
    const fetchUserData = async () => {
      try {
        const userPromise = await api_root.apiToken.get("active_user/", {
          cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
        });
        // console.log(userPromise.data)
        const userData = userPromise.data;
        // alert(userData);
        setUser(userData);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
          // alert(error);
        }
      }
    };

    fetchUserData();

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
  }, [authTokens]);

  // useEffect(() => {
  //   let minutes = 1000 * 60 * 4;
  //   let interval = setInterval(() => {
  //     if (authTokens) {
  //       updateToken();
  //     }
  //   }, minutes);
  //   return () => clearInterval(interval);
  // }, [authTokens, updateToken]);

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

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;
