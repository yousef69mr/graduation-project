import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";
// import EgyptMap from "../components/EgyptMap/EgyptMap";
// import Main from "../components/Main/Main";
// import Home from "../components/Home/Home";

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

      <Suspense fallback={<CircularProgress />}>
        <Main landmarks={props.landmarks} thickness={4.3} />
      </Suspense>
    </React.Fragment>
  );
};

export default HomePage;
