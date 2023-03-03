import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    loggeduser: null,
  });
  const toggleAuth = () => {
    setState({ ...state, isAuthenticated: !state.isAuthenticated });
  };
  return (
    <AuthContext.Provider value={{ ...state, toggleAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
