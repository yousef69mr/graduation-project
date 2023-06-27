import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";
import api from "../axios";
import { useLanguageContext } from "./LanguageContext";
import axios from "axios";

export const LandmarkContext = createContext();

const LandmarkContextProvider = (props) => {
  // const currentLanguage = Cookies.get("i18next");
  const [loading, setLoading] = useState(true);
  const { currentLanguageCode } = useLanguageContext();
  //   console.log(currentLanguage);

  // console.log(governoratesList);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_LANDMARKS":
          return {
            ...state,
            landmarks: action.payload,
          };
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      landmarks: [],
    }
  );

  const updateState = useCallback((action) => {
    dispatch(action);
  }, []);

  useEffect(() => {
    //   console.log(governoratesList);
    let cancelToken;
    const fetchLandmarksData = async (languageCode) => {
      try {
        const landmarksResponse = await api.api.get(
          `${languageCode}/landmarks/`,
          { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
        );
        const landmarksData = landmarksResponse.data;

        dispatch({ type: "SET_LANDMARKS", payload: landmarksData });
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
    fetchLandmarksData(currentLanguageCode);
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
    <LandmarkContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </LandmarkContext.Provider>
  );
};

export const useLandmarkContext = () => {
  const context = useContext(LandmarkContext);
  if (context === undefined) {
    throw new Error(
      "useLandmarkContext must be used within a GovernorateContextProvider"
    );
  }
  return context;
};

export default LandmarkContextProvider;
