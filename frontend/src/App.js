
import './App.css';

import { RxDoubleArrowUp } from "react-icons/rx";
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer';

import ScrollToTop from "react-scroll-to-top";

import BackGroundParticles from './components/BackGroundParticles/BackGroundParticles';

// import Chatbot from './components/Chatbot/Chatbot';

import AlertContextProvider from './contexts/AlertContext';


//dynamic import
const PrivateRoute = lazy(() => import('./utils/PrivateRoute'));
const BlockedRoute = lazy(() => import('./utils/BlockedRoute'));
const AuthContextProvider = lazy(() => import('./contexts/AuthContext'));
const LanguageContextProvider = lazy(() => import('./contexts/LanguageContext'));
const HomePage = lazy(() => import("./Pages/HomePage"));
const LoginSignupPage = lazy(() => import('./Pages/LoginSignupPage'));
const AboutusPage = lazy(() => import('./Pages/AboutusPage'));
const DashboardPage = lazy(() => import('./Pages/DashboardPage'));
const Chatbot = lazy(() => import('./components/Chatbot/Chatbot'))
const CustomizedSnackbar = lazy(() =>
  import("./utils/CustomizedSnackbar")
);


const loading = (<div className='py-4 text-center'>loading.....</div>);

const App = () => {

  //get active user with jwt token


  return (
    <Suspense fallback={loading}>
      <BackGroundParticles />
      <LanguageContextProvider>
        <Chatbot />
      </LanguageContextProvider>

      <Router>
        <ScrollToTop smooth component={<RxDoubleArrowUp style={{ height: "2rem !important" }} />} style={{ zIndex: "9000", textAlign: 'center', backgroundColor: 'var(--SecondaryColor)', color: 'var(--whiteColor)', fontSize: 20 }} />
        <AuthContextProvider>
          <Navbar />
        </AuthContextProvider>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/login_signup' element={
            <AuthContextProvider>
              <BlockedRoute>
                <LoginSignupPage />
              </BlockedRoute>
            </AuthContextProvider>
          }
          />
          <Route path='/aboutus' element={<AboutusPage />} />
          <Route path='/dashboard' element={
            <AuthContextProvider>
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            </AuthContextProvider>
          } />
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

