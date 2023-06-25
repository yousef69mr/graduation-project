import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";
import api from "../axios";
import { LanguageContext } from "./LanguageContext";
import axios from "axios";

export const GovernorateContext = createContext();

const GovernorateContextProvider = (props) => {
  // const currentLanguage = Cookies.get("i18next");
  const [loading, setLoading] = useState(true);
  const { currentLanguageCode } = useContext(LanguageContext);
  //   console.log(currentLanguage);

  // console.log(governoratesList);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_GOVERNORATES":
          return {
            ...state,
            governorates: action.payload,
          };
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      governorates: [],
    }
  );

  const updateState = useCallback((action) => {
    dispatch(action);
  }, []);

  useEffect(() => {
    //   console.log(governoratesList);
    let cancelToken;
    const fetchGovernoratesData = async (languageCode) => {
      try {
        const governoratesResponse = await api.api.get(
          `${languageCode}/governorates/`,
          { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
        );
        const governoratesData = governoratesResponse.data;

        dispatch({ type: "SET_GOVERNORATES", payload: governoratesData });
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

    setLoading(true);
    fetchGovernoratesData(currentLanguageCode);
    setLoading(false);

    return () => {
      if (cancelToken) {
        cancelToken();
      }
    };
    // console.log(governorates);
  }, [currentLanguageCode]);

  if (loading) {
    return <>Loading......</>;
  }
  return (
    <GovernorateContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </GovernorateContext.Provider>
  );
};

export default GovernorateContextProvider;
