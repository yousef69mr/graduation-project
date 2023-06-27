import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [state, setState] = useState({
    theme: localStorage.getItem("theme") || "dark",
    colorTheme: localStorage.getItem("colortheme") || "blue",
  });

  const ThemeHandler = useCallback((actionType, payload) => {
    switch (actionType) {
      case "CHANGE_COLOR_THEME":
        setState((prevState) => ({
          ...prevState,
          colorTheme: payload,
        }));
        break;
      case "TOGGLE_THEME":
        setState((prevState) => ({
          ...prevState,
          theme: prevState.theme === "dark" ? "light" : "dark",
        }));

        break;
      default:
        break;
    }
  }, []);

  const toggleTheme = () => {
    ThemeHandler("TOGGLE_THEME");
  };

  useEffect(() => {
    document.body.className = `${state.colorTheme} ${state.theme}`;
    localStorage.setItem("theme", state.theme);
    localStorage.setItem("colortheme", state.colorTheme);
  }, [state]);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        ThemeHandler,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};

export default ThemeContextProvider;
