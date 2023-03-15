import React, { lazy, useContext, useEffect, useState } from "react";
import css from "./navbar.module.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle, AiOutlineSetting } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import SettingDropDown from "../../utils/SettingDropDownList";

import { t } from "i18next";

import "flag-icons/css/flag-icons.min.css";
import { Link } from "react-router-dom";
import LanguageContextProvider from "../../contexts/LanguageContext";
import ThemeContextProvider from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

//dynamic import
const AccountMenu = lazy(() => import("../../utils/AccountMenu"));

const Navbar = (props) => {
  const { isAuthenticated, logoutUser, activeUser } = useContext(AuthContext);
  const [authMenu, setAuthMenu] = useState();

  //open sidebar
  const [active, setActive] = useState(`${css.navBar}`);
  const [toggle, setToggle] = useState(false);
  const showNav = () => {
    setActive(`${css.navBar} ${css.activeNavbar}`);
  };

  const removeNav = () => {
    setActive(`${css.navBar}`);
  };

  const toggleNavbar = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    if (toggle) {
      showNav();
    } else {
      removeNav();
    }
  }, [toggle]);

  useEffect(() => {
    if (isAuthenticated) {
      setAuthMenu(
        <AccountMenu
          activeUser={activeUser}
          logoutButton={
            <Link to={"/"} onClick={logoutUser}>
              <button
                className="btn"
                style={{ width: "100%" }}
                onClick={removeNav}
              >
                <BiLogOut className="icon" style={{ fontSize: "18px" }} />
                {t("navbar.logout")}
              </button>
            </Link>
          }
        />
      );
    } else {
      setAuthMenu(
        <Link to={"/login_signup"}>
          <button className="btn" onClick={removeNav}>
            {t("navbar.login")}
          </button>
        </Link>
      );
    }
  }, [isAuthenticated]);

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
            <li className={css.navItem} onClick={removeNav}>
              <Link to={"/"} className={css.navLink}>
                {t("navbar.home")}
              </Link>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <Link to={"#"} className={css.navLink}>
                {t("navbar.governorates")}
              </Link>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <Link to={"#"} className={css.navLink}>
                {t("navbar.landmarks")}
              </Link>
            </li>

            <li className={css.navItem} onClick={removeNav}>
              <Link to={"#"} className={css.navLink}>
                {t("navbar.recomendations")}
              </Link>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <Link to={"/aboutus"} className={css.navLink}>
                {t("navbar.aboutus")}
              </Link>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <Link to={"/contact"} className={css.navLink}>
                {t("navbar.contact")}
              </Link>
            </li>
            {authMenu}
          </ul>
          <div onClick={removeNav} className={css.closeNavbar}>
            <AiFillCloseCircle className="icon" />
          </div>
        </nav>
        <div onClick={showNav} className={css.toggleNavbar}>
          <TbGridDots className={css.icon} onClick={toggleNavbar} />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
