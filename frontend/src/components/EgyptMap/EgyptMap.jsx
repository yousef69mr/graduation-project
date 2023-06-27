import React, { useEffect, useState } from "react";
import css from "./EgyptMap.module.css";

import Map from "../Map/Map.jsx";
import { t } from "i18next";
import ThemeContextProvider from "../../contexts/ThemeContext";
import GovernorateContextProvider from "../../contexts/GovernorateContext";
import LanguageContextProvider from "../../contexts/LanguageContext";
const EgyptMap = (props) => {
  const [Height, setHeight] = useState(0);
  const [mapSize, setMapSize] = useState(600);

  // window.addEventListener("resize", () => {
  //   // setMapSize(
  //   //   window.getComputedStyle(document.querySelector("#Map_egypt_map__AUKNF"))
  //   //     .width
  //   // );
  //   setHeight(window.innerHeight);

  //   // console.log(mapSize);
  // });

  useEffect(() => {
    setHeight(window.innerHeight - 76);
  }, []);

  return (
    <section
      className={css.container}
      style={{ height: Height < mapSize ? `${Height - 10}px` : `${Height}px` }}
    >
      <div className={css.side_text}>
        <h1>{t("Map_section.welcome_message")}</h1>
        <p>{t("Map_section.brief")}</p>
      </div>
      <div className={css.map_container}>
        <LanguageContextProvider>
          <ThemeContextProvider>
            <GovernorateContextProvider>
              <Map map_size={mapSize} sectionHeight={Height} />
            </GovernorateContextProvider>
          </ThemeContextProvider>
        </LanguageContextProvider>
      </div>
    </section>
  );
};

export default EgyptMap;
