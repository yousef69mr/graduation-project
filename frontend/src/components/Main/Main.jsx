import React, { useEffect } from "react";
import css from "./main.module.css";
import { t } from "i18next";

import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";

import aos from "aos";
import "aos/dist/aos.css";

const Main = (props) => {
  const Data = props.landmarks;

  useEffect(() => {
    aos.init({ duration: 1500 });
  }, []);

  return (
    <section className={`${css.main} section container`}>
      <div className={css.secTitle}>
        <h3 data-aos="fade-right" className={css.title}>
          {t("landmark_section.title")}
        </h3>
      </div>
      <div className={`${css.secContent} grid`}>
        {Data?.map((destination) => {
          return (
            <div
              data-aos="fade-up"
              key={destination.id}
              className={css.singleDestination}
            >
              <div className={css.imageDiv}>
                <img src={destination.image} alt={destination.title} />
              </div>
              <div className={css.cardInfo}>
                <h4 className={css.destTitle}>{destination.title}</h4>
                <span className={`${css.continent} flex`}>
                  <HiOutlineLocationMarker className={css.icon} />
                  <span className={css.name}>{destination.location}</span>
                </span>
                <div className={`${css.fees} flex`}>
                  <div className={css.grade}>
                    <span>
                      {destination.grade}
                      <small>+1</small>
                    </span>
                  </div>
                  <div className={css.price}>
                    <h5>{destination.fees}</h5>
                  </div>
                </div>
                <div className={css.description}>
                  <p>{destination.description}</p>
                </div>
                <button className="btn flex">
                  Details <HiOutlineClipboardCheck className={css.icon} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Main;
