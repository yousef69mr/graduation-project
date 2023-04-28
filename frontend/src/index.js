import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import getData from './utils/getData';

import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

// require('events').EventEmitter.prototype._maxListeners = 100;

//translation for api calls
// import { setConfig } from 'react-google-translate'

// setConfig({
//   clientEmail: process.env.REACT_APP_GCP_CLIENT_EMAIL ?? '',
//   privateKey: process.env.REACT_APP_GCP_PRIVATE_KEY ?? '',
//   projectId: process.env.REACT_APP_GCP_PROJECT_ID ?? ''
// })

// console.log(process.env.REACT_APP_GCP_CLIENT_EMAIL, process.env.REACT_APP_GCP_PRIVATE_KEY, process.env.REACT_APP_GCP_PROJECT_ID)

export const backendBaseURL = "http://127.0.0.1:8000/";
export const backendAPI = backendBaseURL.concat("api/");

const languagesPromise = getData(backendAPI.concat('languages/'));

const LanguageHandler = async () => {
  let lang = await languagesPromise;

  //backup solution 
  if (lang?.length === 0 || lang === undefined) {

    const cachedData = await import('./Data/data.json');
    // console.log(cachedData)
    lang = cachedData.languages
  }
  const languages_codes = lang.map((value, index, array) => value.code)
  // console.log(languages_codes)


  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({

      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      supportedLngs: [...languages_codes],

      fallbackLng: "en",

      detection: {

        order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
        caches: ['cookie']
      },
      backend: {
        loadPath: '/assets/locales/{{lng}}/translation.json',
      }
    });

  console.log("supportedLngs", languages_codes)
}

LanguageHandler();



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <React.StrictMode>

    <App />

  </React.StrictMode>

);


