import React, { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LanguageContextProvider from "../contexts/LanguageContext";
import LandmarkContextProvider from "../contexts/LandmarkContext";

//dynamic import
const EgyptMap = lazy(() => import("../components/EgyptMap/EgyptMap"));
const Main = lazy(() => import("../components/Main/Main"));
const Home = lazy(() => import("../components/Home/Home"));

const HomePage = (props) => {
  return (
    <React.Fragment>
      <Suspense fallback={<CircularProgress thickness={4.3} />}>
        <EgyptMap governorates={props.governorates} />
      </Suspense>
      <Suspense fallback={<CircularProgress thickness={4.3} />}>
        <Home />
      </Suspense>

      <Suspense fallback={<CircularProgress thickness={4.3} />}>
        <LanguageContextProvider>
          <LandmarkContextProvider>
            <Main />
          </LandmarkContextProvider>
        </LanguageContextProvider>
      </Suspense>
    </React.Fragment>
  );
};

export default HomePage;
