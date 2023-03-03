import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  let theme = localStorage.getItem("theme");
  let colortheme = localStorage.getItem("colortheme");

  const [state, setState] = useState({
    theme: theme ? theme : "dark",
    colorTheme: colortheme ? colortheme : "blue",
  });

  const ThemeHandler = (actionType, payload) => {
    switch (actionType) {
      case "CHANGE_COLOR_THEME":
        let theme = localStorage.getItem("theme") || state.colorTheme;
        setState({ theme: theme, colorTheme: payload });
        localStorage.setItem("colortheme", payload);
        return;
      case "TOGGLE_THEME":
        let colortheme = localStorage.getItem("colortheme");
        if (state.theme === "dark") {
          setState({ colorTheme: colortheme, theme: "light" });
          localStorage.setItem("theme", "light");
        } else {
          setState({ colorTheme: colortheme, theme: "dark" });
          localStorage.setItem("theme", "dark");
        }
        return;
      default:
        return state;
    }
  };

  const toggleTheme = () => {
    ThemeHandler("TOGGLE_THEME");
  };
  useEffect(() => {
    document.body.className = `${state.colorTheme} ${state.theme}`;
  }, [state]);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        ThemeHandler: ThemeHandler,
        toggleTheme: toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
