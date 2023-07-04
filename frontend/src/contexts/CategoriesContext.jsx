import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useState,
} from "react";
import StandardLoader from "../Helper/Loader";
import api_root from "../axios";
import { useLanguageContext } from "./LanguageContext";
import axios from "axios";

export const CategoriesContext = createContext();

const CategoriesContextProvider = (props) => {
  // const currentLanguage = Cookies.get("i18next");
  const [loading, setLoading] = useState(true);
  const { currentLanguageCode } = useLanguageContext();
  //   console.log(currentLanguage);

  // console.log(governoratesList);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_TYPE_CATEGORIES":
          return {
            ...state,
            typeCategories: action.payload,
          };
        case "SET_TOURISM_CATEGORIES":
          return {
            ...state,
            tourismCategories: action.payload,
          };
        case "SET_TICKET_CLASS_CATEGORIES":
          return {
            ...state,
            ticketClassCategories: action.payload,
          };
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      typeCategories: [],
      tourismCategories: [],
      ticketClassCategories: [],
    }
  );

  const updateState = useCallback((action) => {
    dispatch(action);
  }, []);

  useEffect(() => {
    //   console.log(governoratesList);
    let cancelToken;
    const fetchCategoriesData = async (languageCode) => {
      try {
        const tourismCategoriesPromise = await api_root.api.get(
          `${languageCode}/tourism_categories/`,
          { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
        );
        const tourismCategoriesData = tourismCategoriesPromise.data;

        const typeCategoriesPromise = await api_root.api.get(
          `${languageCode}/type_categories/`,
          { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
        );
        const typeCategoriesData = typeCategoriesPromise.data;

        const ticketClassCategoriesPromise = await api_root.api.get(
          `${languageCode}/ticket_class_categories/`,
          { cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
        );
        const ticketClassCategoriesData = ticketClassCategoriesPromise.data;

        dispatch({
          type: "SET_TOURISM_CATEGORIES",
          payload: tourismCategoriesData,
        });
        dispatch({
          type: "SET_TYPE_CATEGORIES",
          payload: typeCategoriesData,
        });
        dispatch({
          type: "SET_TICKET_CLASS_CATEGORIES",
          payload: ticketClassCategoriesData,
        });
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
    fetchCategoriesData(currentLanguageCode);
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
    <CategoriesContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error(
      "useCategoriesContext must be used within a CategoriesContextProvider"
    );
  }
  return context;
};

export default CategoriesContextProvider;
