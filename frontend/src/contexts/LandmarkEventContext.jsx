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

export const LandmarkEventContext = createContext();

const LandmarkEventContextProvider = (props) => {
  // const currentLanguage = Cookies.get("i18next");
  const [loading, setLoading] = useState(true);
  const { currentLanguageCode } = useLanguageContext();
  //   console.log(currentLanguage);

  // console.log(governoratesList);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_LANDMARK_EVENTS":
          return {
            ...state,
            landmarkEvents: action.payload,
          };
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      landmarkEvents: [],
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
          `${languageCode}/landmark_events/`,
          { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
        );
        const landmarkEventsData = landmarksResponse.data;

        dispatch({ type: "SET_LANDMARK_EVENTS", payload: landmarkEventsData });
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
    fetchLandmarksData(currentLanguageCode);
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
    <LandmarkEventContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </LandmarkEventContext.Provider>
  );
};

export const useLandmarkEventContext = () => {
  const context = useContext(LandmarkEventContext);
  if (context === undefined) {
    throw new Error(
      "useLandmarkEventContext must be used within a LandmarkEventContextProvider"
    );
  }
  return context;
};

export default LandmarkEventContextProvider;
