import React, { createContext, useState, useContext } from "react";

export const AlertContext = createContext();

const AlertContextProvider = (props) => {
  const [state, setState] = useState({
    info: "",
    alertTheme: "info",
    message: "",
  });

  const AlertHandler = (actionType, payload) => {
    switch (actionType) {
      case "UPDATE":
        setState({ message: payload.message, alertTheme: payload.alertTheme });
        break;
      case "RESET":
        resetAlert();
        break;
      default:
        break;
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

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext must be used within a AlertContextProvider"
    );
  }
  return context;
};

export default AlertContextProvider;
