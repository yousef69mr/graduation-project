import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useCallback,
} from "react";
import api from "../axios";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
// import data from "../Data/data.json";
import cookies from "js-cookie";

import axios from "axios";
export const LanguageContext = createContext();

const LanguageContextProvider = (props) => {
  const { t } = useTranslation();

  // const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_LANGUAGES":
          return {
            ...state,
            languages: action.payload,
          };
        case "SET_CURRENT_LANGUAGE":
          const currentLanguage = state.languages?.find(
            (lang) => lang?.code === action.payload
          );
          cookies.set("i18next", action.payload);
          return {
            ...state,
            currentLanguage: currentLanguage,
            currentLanguageCode: action.payload,
          };
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      languages: [],
      currentLanguageCode: cookies.get("i18next") || "en",
      currentLanguage: null,
    }
  );

  useEffect(() => {
    let cancelToken;
    const fetchLanguagesData = async () => {
      try {
        const languagesResponse = await api.api.get(`languages/`, {
          cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
        });
        const languagesData = languagesResponse.data;

        dispatch({ type: "SET_LANGUAGES", payload: languagesData });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error.message);
        }
      }
    };

    fetchLanguagesData();

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
  }, []);

  useEffect(() => {
    document.body.dir = state.currentLanguage?.dir || "ltr";
    document.title = t("app_title");
    // setLoading(false);
  }, [state.currentLanguage, t]);

  useEffect(() => {
    const changeLanguage = async (lng) => {
      await i18next.changeLanguage(lng);
    };

    changeLanguage(state.currentLanguageCode);
    dispatch({
      type: "SET_CURRENT_LANGUAGE",
      payload: state.currentLanguageCode,
    });
  }, [state.currentLanguageCode, state.languages]);



  const updateState = useCallback((action) => {
    dispatch(action);
  }, []);



  // if (loading) {
  //   return <>loading.....</>;
  // }

  return (
    <LanguageContext.Provider
      value={{
        ...state,
        updateState,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      "useLanguageContext must be used within a LanguageContextProvider"
    );
  }
  return context;
};

export default LanguageContextProvider;
