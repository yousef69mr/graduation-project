import React, { useEffect } from "react";
import css from "./home.module.css";
import video2 from "../../assets/video/ThisisEgypt.mp4";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiFacebook } from "react-icons/fi";
import { FaTripadvisor } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import { BsListTask } from "react-icons/bs";
import { t } from "i18next";
import aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  return (
    <section className={css.home}>
      <div className={css.overlay}></div>
      <video src={video2} muted loop={true} autoPlay type="video/mp4"></video>

      <div className={`${css.homeContent} container`}>
        <div className={css.textDiv}>
          <span data-aos="fade-up" className={css.smallText}>
            Our Packages
          </span>
          <h1 data-aos="fade-up" className={css.homeTitle}>
            {t("")}
          </h1>
        </div>

        <div data-aos="fade-up" className={`${css.cardDiv} grid`}>
          <div className={css.destinationInput}>
            <label htmlFor="city">Search your destination</label>
            <div className={`${css.input} flex`}>
              <input type="text" placeholder="Enter your City here" />
              <GrLocation className={css.icon} />
            </div>
          </div>
          <div className={css.dateInput}>
            <label htmlFor="date">Select your Date :</label>
            <div className={`${css.input} flex`}>
              <input type="date" />
            </div>
          </div>
          <div className={css.priceInput}>
            <div className={`${css.label_total} flex`}>
              <label htmlFor="price">Max price : </label>
              <h3 className={css.total}>
                &nbsp;$<em>5000</em>
              </h3>
            </div>
            <div className={`${css.input} flex`}>
              <input type="range" max="5000" min="100" />
            </div>
          </div>
          <div className={`${css.searchOptions} flex`}>
            <HiFilter className={css.icon} />
            <span>More Filters</span>
          </div>
        </div>
        <div data-aos="fade-up" className={`${css.homeFooterIcons} flex`}>
          <div className={css.rightIcons}>
            <FiFacebook className={css.icon} />
            <AiOutlineInstagram className={css.icon} />
            <FaTripadvisor className={css.icon} />
          </div>
          <div className={css.leftIcons}>
            <BsListTask className={css.icon} />
            <TbApps className={css.icon} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
