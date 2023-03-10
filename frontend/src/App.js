
import './App.css';

import { RxDoubleArrowUp } from "react-icons/rx";
import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer';

import ScrollToTop from "react-scroll-to-top";

import Data from "./Data/data.json";
import BackGroundParticles from './components/BackGroundParticles/BackGroundParticles';

import ChatBot from './components/ChatBot/ChatBot';

import AlertContextProvider from './contexts/AlertContext';

//dynamic import 
const HomePage = lazy(() => import("./Pages/HomePage"));
const LoginSignupPage = lazy(() => import('./Pages/LoginSignupPage'));
const AboutusPage = lazy(() => import('./Pages/AboutusPage'));
const DashboardPage = lazy(() => import('./Pages/DashboardPage'));
const CustomizedSnackbar = lazy(() =>
  import("./services/CustomizedSnackbar")
);


const loading = (<div className='py-4 text-center'>loading.....</div>);

const App = () => {
  const [data, setData] = useState(Data);
  //get active user with jwt token
  const [activeUser, setActiveUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPotentialLogin, setIsPotentialLogin] = useState(false);


  useEffect(() => {

    // (async () => {
    //   const response = await fetch(backendHost.concat('loggeduser'), {
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //   });

    //   const user = await response.json();
    //   setActiveUser(user);
    //   console.log(user);
    //   // if (user != null) {
    //   //   setLoggedIn(true)
    //   // }
    // })();

  }, []);


  // useEffect(() => {
  //   if (languageList != null) {
  //     setLanguages(languageList)
  //   }

  //   // console.log(lang)
  // }, [lang, languageList])

  useEffect(() => {
    setData(Data);
  }, [data]);

  return (
    <Suspense fallback={loading}>
      <BackGroundParticles />
      <ChatBot />
      <Router>
        <ScrollToTop smooth component={<RxDoubleArrowUp style={{ height: "2rem !important" }} />} style={{ zIndex: "9000", textAlign: 'center', backgroundColor: 'var(--SecondaryColor)', color: 'var(--whiteColor)', fontSize: 20 }} />

        <Navbar activeUser={activeUser} />

        <Routes>
          <Route exact path='/' element={<HomePage governorates={data.Governorates} landmarks={data.Landmarks} />} />
          <Route path='/login_signup' element={!loggedIn ? <LoginSignupPage setIsPotentialLogin={setIsPotentialLogin} activeUser={activeUser} /> : <Navigate to="/" replace />} />
          <Route path='/aboutus' element={<AboutusPage />} />
          <Route path='/dashboard' element={<DashboardPage activeUser={activeUser} />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        <Footer />
      </Router>
      <AlertContextProvider>

        <CustomizedSnackbar />

      </AlertContextProvider>

    </Suspense>

  );
}


export default App;

