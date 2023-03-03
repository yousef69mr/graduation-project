import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import data from "../Data/data.json";
import cookies from "js-cookie";
import useFetch from "../hooks/useFetch";
import { back_Host_url } from "../index";

export const LanguageContext = createContext();

const LanguageContextProvider = (props) => {
  const { data: languageList } = useFetch(back_Host_url.concat("languages/"));

  const [languages, setLanguages] = useState(data.languages);

  const { t } = useTranslation();

  //change language
  //init values
  const currentLanguageCode = cookies.get("i18next") || "en";
  const initialLanguage = languages.find((l) => l.code === currentLanguageCode);

  const [currentLanguage, setCurrentLanguage] = useState({
    code: currentLanguageCode,
    language: initialLanguage,
  });

  useEffect(() => {
    if (languageList != null) {
      setLanguages(languageList);
      // const currentLanguageCode = cookies.get("i18next") || "en";
      const language = languages.find((l) => l.code === currentLanguageCode);

      setCurrentLanguage({
        code: currentLanguageCode,
        language: language,
      });
    }

    // console.log(lang)
  }, [languageList]);

  useEffect(() => {
    // console.log(currentLanguage.language);
    document.body.dir = currentLanguage.language?.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguageCode: currentLanguage.code,
        currentLanguage: currentLanguage.language,
        languages,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
