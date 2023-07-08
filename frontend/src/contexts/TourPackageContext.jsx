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
//   import { useLanguageContext } from "./LanguageContext";
  import axios from "axios";
  
  export const TourPackageContext = createContext();
  
  const TourPackageContextProvider = (props) => {
    // const currentLanguage = Cookies.get("i18next");
    const [loading, setLoading] = useState(true);
    // const { currentLanguageCode } = useLanguageContext();
    //   console.log(currentLanguage);
  
    // console.log(governoratesList);
    const [state, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case "SET_TOUR_PACKAGES":
            return {
              ...state,
              tourPackages: action.payload,
            };
          default:
            return {
              ...state,
              ...action,
            };
        }
      },
      {
        tourPackages: [],
      }
    );
  
    const updateState = useCallback((action) => {
      dispatch(action);
    }, []);
  
    useEffect(() => {
      //   console.log(governoratesList);
      let cancelToken;
      const fetchTourPackagesData = async () => {
        try {
          const tourPackagesPromise = await api.api.get(`tour_packages/`, {
            cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
          });
          const tourPackagesData = tourPackagesPromise.data;
  
          dispatch({ type: "SET_TOUR_PACKAGES", payload: tourPackagesData });
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
      fetchTourPackagesData();
      // setLoading(false);
  
      return () => {
        if (cancelToken) {
          cancelToken();
        }
      };
      // console.log(governorates);
    }, []);
  
    if (loading) {
      return <StandardLoader />;
    }
    return (
      <TourPackageContext.Provider value={{ ...state, updateState }}>
        {props.children}
      </TourPackageContext.Provider>
    );
  };
  
  export const useTourPackageContext = () => {
    const context = useContext(TourPackageContext);
    if (context === undefined) {
      throw new Error(
        "useTourPackageContext must be used within a TourPackageContextProvider"
      );
    }
    return context;
  };
  
  export default TourPackageContextProvider;
  