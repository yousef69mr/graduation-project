import React, { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { backendAPI } from "../index";
import { LanguageContext } from "./LanguageContext";

export const GovernorateContext = createContext();

const GovernorateContextProvider = (props) => {
  // const currentLanguage = Cookies.get("i18next");
  const { currentLanguageCode } = useContext(LanguageContext);
  //   console.log(currentLanguage);
  const { data: governoratesList } = useFetch(
    backendAPI.concat(`${currentLanguageCode}/governorates/`)
  );

  // console.log(governoratesList);
  const [governorates, setGovernorates] = useState([]);

  useEffect(() => {
    //   console.log(governoratesList);
    setGovernorates(governoratesList);
    // console.log(currentLanguage);

    // console.log(governorates);
  }, [governoratesList]);

  return (
    <GovernorateContext.Provider value={{ governorates }}>
      {props.children}
    </GovernorateContext.Provider>
  );
};

export default GovernorateContextProvider;
