import React, { useState } from "react";
import css from "./navbar.module.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle, AiOutlineSetting } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import SettingDropDown from "../../services/SettingDropDownList";

import { t } from "i18next";

import "flag-icons/css/flag-icons.min.css";
import { Link } from "react-router-dom";
import LanguageContextProvider from "../../contexts/LanguageContext";
import ThemeContextProvider from "../../contexts/ThemeContext";

const Navbar = (props) => {
  const { activeUser } = props;
  // const { theme, colorTheme, toggleTheme } = useContext(ThemeContext);
  // // dark light mode
  // // const [theme, setTheme] = useState("light");

  // //color toggle mode
  // // const [colortheme, setColorTheme] = useState("red");
  // useEffect(() => {
  //   document.body.className = `${colorTheme} ${theme}`;
  // }, [theme, colorTheme]);

  //open sidebar
  const [active, setActive] = useState(`${css.navBar}`);

  const showNav = () => {
    setActive(`${css.navBar} ${css.activeNavbar}`);
  };

  const removeNav = () => {
    setActive(`${css.navBar}`);
  };

  // // //change language
  // const currentLanguageCode = cookies.get("i18next") || "en";
  // const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  // useEffect(() => {
  //   document.body.dir = currentLanguage?.dir || "ltr";
  //   document.title = t("app_title");
  // }, [currentLanguage, t]);

  // console.log(activeUser);
  let menu;
  if (activeUser?.name === "") {
    menu = (
      <button className="btn">
        <Link to={"/logout"}>{t("navbar.logout")}</Link>
      </button>
    );
  } else {
    menu = (
      <button className="btn">
        <Link to={"/login_signup"}>{t("navbar.login")}</Link>
      </button>
    );
  }

  return (
    <section className={css.navBarSection}>
      <header className={`${css.header} flex`}>
        <div className={css.logoDiv}>
          <Link to={"/"} className={`${css.logo} flex`}>
            <h1>
              <MdOutlineTravelExplore className="icon" />
              {t("navbar.title")}
            </h1>
          </Link>
        </div>
        <nav className={active}>
          <ul className={`flex ${css.navLists}`}>
            <li className={css.navItem}>
              <ThemeContextProvider>
                <LanguageContextProvider>
                  <SettingDropDown
                    thumbnail={<AiOutlineSetting className="icon" />}
                  />
                </LanguageContextProvider>
              </ThemeContextProvider>
            </li>
            <li className={css.navItem}>
              <Link to={"/"} className={css.navLink}>
                {t("navbar.home")}
              </Link>
            </li>
            <li className={css.navItem}>
              <Link to={"#"} className={css.navLink}>
                {t("navbar.governorates")}
              </Link>
            </li>
            <li className={css.navItem}>
              <Link to={"#"} className={css.navLink}>
                {t("navbar.landmarks")}
              </Link>
            </li>

            <li className={css.navItem}>
              <Link to={"#"} className={css.navLink}>
                {t("navbar.recomendations")}
              </Link>
            </li>
            <li className={css.navItem}>
              <Link to={"/aboutus"} className={css.navLink}>
                {t("navbar.aboutus")}
              </Link>
            </li>
            <li className={css.navItem}>
              <Link to={"/contact"} className={css.navLink}>
                {t("navbar.contact")}
              </Link>
            </li>
            {menu}
          </ul>
          <div onClick={removeNav} className={css.closeNavbar}>
            <AiFillCloseCircle className="icon" />
          </div>
        </nav>
        <div onClick={showNav} className={css.toggleNavbar}>
          <TbGridDots className={css.icon} />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
