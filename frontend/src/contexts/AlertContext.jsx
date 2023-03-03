import React, { createContext, useState } from "react";

export const AlertContext = createContext();

const AlertContextProvider = (props) => {
  const [state, setState] = useState({
    info: "",
    alertTheme: "info",
    message: "",
  });

  const AlertHandler = (actionType, payload) => {
    switch (actionType) {
      case "":
        setState({ message: payload.message, alertTheme: payload.alertTheme });
        return;
      default:
        return state;
    }
  };

  const resetAlert = () => {
    setState({ ...state, message: "" });
  };

  return (
    <AlertContext.Provider value={{ ...state, AlertHandler, resetAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
