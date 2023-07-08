
import './App.css';

import { RxDoubleArrowUp } from "react-icons/rx";
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer';

import ScrollToTop from "react-scroll-to-top";

import BackGroundParticles from './components/BackGroundParticles/BackGroundParticles';

//dynamic import
const PrivateRoute = lazy(() => import('./utils/PrivateRoute'));
const BlockedRoute = lazy(() => import('./utils/BlockedRoute'));
const AlertContextProvider = lazy(() => import('./contexts/AlertContext'))
const AuthContextProvider = lazy(() => import('./contexts/AuthContext'));
const CategoriesContextProvider = lazy(() => import('./contexts/CategoriesContext'))
const LanguageContextProvider = lazy(() => import('./contexts/LanguageContext'));
const LandmarkContextProvider = lazy(() => import('./contexts/LandmarkContext'));
const HomePage = lazy(() => import("./Pages/HomePage"));
const LoginSignupPage = lazy(() => import('./Pages/LoginSignupPage'));
const AboutusPage = lazy(() => import('./Pages/AboutusPage'));
const DashboardPage = lazy(() => import('./Pages/DashboardPage'));
const CreatePackagePage = lazy(() => import('./Pages/CreatePackagePage'))
const CreateLandmarkPage = lazy(() => import('./Pages/CreateLandmarkPage'))
const Chatbot = lazy(() => import('./components/Chatbot/Chatbot'))
const MultiMessageSnackbar = lazy(() =>
  import("./Helper/MultiMessageSnackbar")
);


const loading = (<div className='py-4 text-center text-color'>loading.....</div>);

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
          <Route path='/create_package' element={
            <AuthContextProvider>
              <PrivateRoute>
                <LanguageContextProvider>
                  <CategoriesContextProvider>
                    <AlertContextProvider>
                      <CreatePackagePage />
                    </AlertContextProvider>
                  </CategoriesContextProvider>
                </LanguageContextProvider>
              </PrivateRoute>
            </AuthContextProvider>
          } />
          <Route path='/add_landmark' element={
            <AuthContextProvider>
              <PrivateRoute>
                <LanguageContextProvider>
                  <CategoriesContextProvider>
                    <AlertContextProvider>
                      <CreateLandmarkPage />
                    </AlertContextProvider>
                  </CategoriesContextProvider>
                </LanguageContextProvider>
              </PrivateRoute>
            </AuthContextProvider>
          } />
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
        <AuthContextProvider>
          <LanguageContextProvider>
            <LandmarkContextProvider>
              <Footer />
            </LandmarkContextProvider>
          </LanguageContextProvider>
        </AuthContextProvider>
      </Router>
      <AlertContextProvider>
        <MultiMessageSnackbar />
      </AlertContextProvider>

    </Suspense>

  );
}


export default App;

