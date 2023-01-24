import React from "react";
import EgyptMap from "../components/EgyptMap/EgyptMap";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";



const HomePage = (props) => {
  return (
    <React.Fragment>
      <EgyptMap governorates={props.governorates} />
      <Home />
      <Main landmarks={props.landmarks} />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
