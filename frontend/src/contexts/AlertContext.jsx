import React, {
  createContext,
  useCallback,
  useContext,
  // useEffect,
  useReducer,
} from "react";

export const AlertContext = createContext();

const AlertContextProvider = (props) => {
  // const [state, setState] = useState({
  //   info: "",
  //   alertTheme: "info",
  //   message: "",
  // });

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "ADD_MESSAGE":
          // alert(JSON.stringify(action.payload));
          const newMessages = [...state.messages, action.payload];
          // alert(JSON.stringify(newMessages));
          return {
            ...state,
            messages: newMessages,
          };
        case "RESET_MESSAGES":
          return {
            ...state,
            messages: [],
          };
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      messages: [],
    }
  );

  const updateState = useCallback((action) => {
    dispatch(action);
  }, []);

  // useEffect(() => {}, [state.messages]);

  return (
    <AlertContext.Provider value={{ ...state, updateState }}>
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
