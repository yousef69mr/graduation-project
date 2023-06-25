import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import api from "../axios";
import { useTranslation } from "react-i18next";
// import data from "../Data/data.json";
import cookies from "js-cookie";

import axios from "axios";
export const LanguageContext = createContext();

const LanguageContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  // const { data: languageList, } = useFetch(
  //   backendAPI.concat("")
  // );

  const { t } = useTranslation();

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
            (lang) => lang.code === action.payload
          );
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
      currentLanguage: { code: "en" },
    }
  );

  const updateState = useCallback((action) => {
    dispatch(action);
  }, []);

  //change language
  //init values
  // const currentLanguageCode = cookies.get("i18next") || "en";
  // const initialLanguage = state.languages?.find(
  //   (l) => l.code === currentLanguageCode
  // );

  // const [currentLanguage, setCurrentLanguage] = useState({
  //   code: currentLanguageCode,
  //   language: initialLanguage,
  // });

  useEffect(() => {
    //   console.log(governoratesList);
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
          // setLoading(false);
          // alert(error.message);
        }
      }
    };

    fetchLanguagesData();

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
    // console.log(governorates);
  }, []);

  useEffect(() => {
    setLoading(true);
    // alert(JSON.stringify(state));
    // const currentLanguageCode = cookies.get("i18next") || "en";
    // const language = state.languages?.find(
    //   (l) => l.code === state.currentLanguageCode
    // );
    const currentLanguageCode = cookies.get("i18next") || "en";
    
    // alert(JSON.stringify(language));
    // alert(language)

    dispatch({ type: "SET_CURRENT_LANGUAGE", payload: currentLanguageCode });
    
  }, [state.currentLanguageCode]);

  useEffect(() => {
    // setLoading(true);
    // console.log(currentLanguage.language);
    // alert(JSON.stringify(state))
    document.body.dir = state.currentLanguage?.dir || "ltr";
    document.title = t("app_title");
    setLoading(false);
  }, [state.currentLanguage, t]);

  if (loading) {
    return <>loading.....</>;
  }

  return (
    <LanguageContext.Provider
      value={{
        ...state,
        t,
        updateState,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
