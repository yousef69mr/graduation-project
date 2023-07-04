import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";
import StandardLoader from "../Helper/Loader";
import api from "../axios";
import { useLanguageContext } from "./LanguageContext";
import axios from "axios";

export const TicketContext = createContext();

const TicketContextProvider = (props) => {
  // const currentLanguage = Cookies.get("i18next");
  const [loading, setLoading] = useState(true);
  const { currentLanguageCode } = useLanguageContext();
  //   console.log(currentLanguage);

  // console.log(governoratesList);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_TICKETS":
          return {
            ...state,
            tickets: action.payload,
          };
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      tickets: [],
    }
  );

  const updateState = useCallback((action) => {
    dispatch(action);
  }, []);

  useEffect(() => {
    //   console.log(governoratesList);
    let cancelToken;
    const fetchTicketsData = async (languageCode) => {
      try {
        const ticketsResponse = await api.api.get(`${languageCode}/tickets/`, {
          cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
        });
        const ticketsData = ticketsResponse.data;

        dispatch({ type: "SET_TICKETS", payload: ticketsData });
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error.message);
          setLoading(false);
          // alert(error.message);
        }
      }
    };

    setLoading(true);
    fetchTicketsData(currentLanguageCode);
    // setLoading(false);

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
    // console.log(governorates);
  }, [currentLanguageCode]);

  if (loading) {
    return <StandardLoader />;
  }
  return (
    <TicketContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error(
      "useTicketContext must be used within a TicketContextProvider"
    );
  }
  return context;
};

export default TicketContextProvider;
