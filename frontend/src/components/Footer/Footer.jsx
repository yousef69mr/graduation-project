import React, { useEffect } from "react";

import video from "../../assets/video/This_is_Egypt.mp4";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight, FiChevronLeft, FiSend } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";

import aos from "aos";
import "aos/dist/aos.css";

import { useLandmarkContext } from "../../contexts/LandmarkContext";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useAuthContext } from "../../contexts/AuthContext";

import css from "./footer.module.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { currentLanguage } = useLanguageContext();
  const { landmarks } = useLandmarkContext();
  const { isAuthenticated } = useAuthContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  const listIcon =
    currentLanguage?.dir === "rtl" ? (
      <FiChevronLeft className="icon" />
    ) : (
      <FiChevronRight className="icon" />
    );

  return (
    <footer className={css.footer}>
      <div className={css.videoDiv}>
        <video src={video} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className={`${css.secContent} container`}>
        <div className={`${css.contactDiv} flex`}>
          <div data-aos="fade-up" className={css.text}>
            <small>{t("footer.title")}</small>
            <h2>{t("footer.subTitle")}</h2>
          </div>

          <div className={`${css.inputDiv} flex`}>
            <input
              data-aos="fade-up"
              type="text"
              placeholder={t("footer.emailPlaceholder")}
            />
            <button
              data-aos="fade-up"
              className={`btn ${css.btn} flex`}
              type="submit"
            >
              {t("footer.send")} <FiSend className={`icon ${css.icon}`} />
            </button>
          </div>
        </div>

        <div className={`${css.footerCard} flex`}>
          <div className={`${css.footerIntro} flex`}>
            <div className={css.logoDiv}>
              <Link to={"/"} className={`${css.logo} flex`}>
                <MdOutlineTravelExplore className="icon" />
                {t("app_title")}
              </Link>
            </div>

            <div data-aos="fade-up" className={css.footerParagraph}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique numquam, voluptates iste possimus nemo nihil soluta
                saepe dolor? Minima voluptatem quae labore cumque, voluptatibus
                praesentium quisquam assumenda optio accusantium et!
              </p>
            </div>

            {isAuthenticated && (
              <Box data-aos="fade-up">
                <Button
                  className="btn border-radius"
                  onClick={() => navigate("/add_landmark")}
                >
                  {t("create", { instance: t("landmark") })}
                </Button>
              </Box>
            )}

            <div data-aos="fade-up" className={css.footerSocials}>
              <AiOutlineTwitter className={`icon ${css.icon}`} />
              <AiFillYoutube className={`icon ${css.icon}`} />
              <AiFillInstagram className={`icon ${css.icon}`} />
              <FaTripadvisor className={`icon ${css.icon}`} />
            </div>
          </div>

          <div className={`${css.footerLinks} grid`}>
            {/* link Group 1 */}
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className={css.linkGroup}
            >
              <span className={css.groupTitle}>Our Agency</span>

              <li className={`${css.footerList} flex`}>
                {listIcon}
                Services
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                Insurance
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                Agency
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                Tourism
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                Payment
              </li>
            </div>

            {/* link Group 2  */}
            <div
              data-aos="fade-up"
              data-aos-duration="4000"
              className={css.linkGroup}
            >
              <span className={css.groupTitle}>Partners</span>

              <li className={`${css.footerList} flex`}>
                {listIcon}
                Bookings
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                HostelWorld
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                Trivago
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                Rentcars
              </li>
              <li className={`${css.footerList} flex`}>
                {listIcon}
                TripAdvisor
              </li>
            </div>

            {/*  link Group 3  */}
            <div
              data-aos="fade-up"
              data-aos-duration="5000"
              className={css.linkGroup}
            >
              <span className={css.groupTitle}>
                {t("footer.latestLandmarks")}
              </span>

              {landmarks?.slice(0, 5)?.map((landmark) => (
                <Link
                  key={landmark?.landmark?.id}
                  to={`/landmarks/${landmark?.landmark?.id}`}
                >
                  <li className={`${css.footerList} flex`}>
                    {listIcon}
                    {landmark?.title}
                  </li>
                </Link>
              ))}
              {/* <li className={`${css.footerList} flex`}>
                <FiChevronRight className="icon" />
                Sharm ElSheikh
              </li>
              <li className={`${css.footerList} flex`}>
                <FiChevronRight className="icon" />
                Luxor
              </li>
              <li className={`${css.footerList} flex`}>
                <FiChevronRight className="icon" />
                Cairo
              </li>
              <li className={`${css.footerList} flex`}>
                <FiChevronRight className="icon" />
                Fayoum
              </li>
              <li className={`${css.footerList} flex`}>
                <FiChevronRight className="icon" />
                Marsa Matrouh
              </li> */}
            </div>
          </div>

          <div className={`${css.footerDiv} flex`}>
            <small>{t("app_title")}</small>
            <small>{t("footer.copyRights")}</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
