// import i18n from "i18next";
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import api_root from "./axios";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({

        // the key separator for nested translations
        // keySeparator: ".",
        // the supported language codes
        supportedLngs: ['en', 'ar'],
        // the fallback language
        fallbackLng: 'en',
        detection: {
            order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain', "querystring", "navigator"],
            caches: ['cookie'],
        },
        // debug: true,
        backend: {
            // path where the JSON translation files are located
            loadPath: '/assets/locales/{{lng}}/translation.json',
        },
        interpolation: {
            escapeValue: false,
        },
    });

// Fetch supported languages from API and update i18next options
export const initializeLanguage = async () => {
    const languagePromise = await api_root.api.get("languages/")

    // Map the language objects to an array of language codes
    const languageCodes = languagePromise.data.map((language) => language.code);

    // Add the new language resources to the i18next instance
    // languageCodes.forEach((languageCode) => {
    //     i18n.addResourceBundle(languageCode, "translation", {});
    // });

    i18next.options.supportedLngs = languageCodes;
    console.log(i18next.language, i18next.options.supportedLngs)
    // Change the current language to trigger a re-render of the app
    i18next.changeLanguage(i18next.language);
    // i18n
    //     .use(Backend)
    //     .use(initReactI18next)
    //     .use(LanguageDetector)
    //     .init({
    //         backend: {
    //             // path where the JSON translation files are located
    //             loadPath: "/assets/locales/{{lng}}/translation.json",
    //         },
    //         // the key separator for nested translations
    //         // keySeparator: ".",
    //         // the supported language codes
    //         supportedLngs: [...languageCodes],
    //         // the fallback language
    //         fallbackLng: "en",
    //         detection: {
    //             order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain', "querystring", "navigator"],
    //             caches: ["cookie"],
    //         },
    //         interpolation: {
    //             escapeValue: false,
    //         },
    //     });
    console.log(i18next.language, i18next.options.supportedLngs)

}

// initialize()



// export async function initializeLanguage() {
//     const languagesPromise = getData('languages/');

//     let lang = await languagesPromise;

//     // Backup solution
//     if (lang?.length === 0 || lang === undefined) {
//         const cachedData = await import('./Data/data.json');
//         lang = cachedData.languages;
//     }

//     const languagesCodes = lang.map((value, index, array) => value.code);

//     i18next
//         .use(initReactI18next)
//         .use(LanguageDetector)
//         .use(HttpApi)
//         .init({
//             supportedLngs: [...languagesCodes],
//             fallbackLng: 'en',
//             detection: {
//                 order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
//                 caches: ['cookie'],
//             },
//             backend: {
//                 loadPath: '/assets/locales/{{lng}}/translation.json',
//             },
//             interpolation: {
//                 escapeValue: false,
//             },
//         });

//     console.log('supportedLngs', languagesCodes);
// }
// // const languagesPromise = getData('languages/');

// const LanguageHandler = async () => {
//     let lang = await languagesPromise;

//     //backup solution
//     if (lang?.length === 0 || lang === undefined) {

//         const cachedData = await import('./Data/data.json');
//         // console.log(cachedData)
//         lang = cachedData.languages
//     }
//     const languages_codes = lang.map((value, index, array) => value.code)
//     // console.log(languages_codes)


//     i18n
//         .use(initReactI18next) // passes i18n down to react-i18next
//         .use(LanguageDetector)
//         .use(HttpApi)
//         .init({

//             // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
//             supportedLngs: [...languages_codes],

//             fallbackLng: "en",

//             detection: {

//                 order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
//                 caches: ['cookie']
//             },
//             backend: {
//                 loadPath: '/assets/locales/{{lng}}/translation.json',
//             },
//             interpolation: {
//                 escapeValue: false,
//             },
//         });

//     console.log("supportedLngs", languages_codes)
// }

// try {
//     initializeLanguage();
// } catch (error) {
//     console.error('Failed to initialize i18next:', error);
//     // Show an error message to the user
// }
