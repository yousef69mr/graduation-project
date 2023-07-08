import React, { lazy, useEffect, useState } from "react";
import css from "./navbar.module.css";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle, AiOutlineSetting } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import SettingDropDown from "../../utils/SettingDropDownList";

// import { t } from "i18next";
import Button from "@mui/material/Button";
import "flag-icons/css/flag-icons.min.css";
import { NavLink } from "react-router-dom";
import LanguageContextProvider from "../../contexts/LanguageContext";
import ThemeContextProvider from "../../contexts/ThemeContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

//dynamic import
const AccountMenu = lazy(() => import("../../utils/AccountMenu"));

const Navbar = (props) => {
  const { isAuthenticated, logoutUser, activeUser } = useAuthContext();
  const [authMenu, setAuthMenu] = useState();
  const { t } = useTranslation();
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
            // <NavLink to={"/"} onClick={logoutUser}>
            <Button
              className="btn"
              style={{ width: "100%" }}
              onClick={() => {
                logoutUser();
                removeNav();
              }}
            >
              <BiLogOut className="icon" style={{ fontSize: "18px" }} />
              {t("navbar.logout")}
            </Button>
            // </NavLink>
          }
        />
      );
    } else {
      setAuthMenu(
        <NavLink to={"/login_signup"}>
          <button className="btn" onClick={removeNav}>
            {t("navbar.login")}
          </button>
        </NavLink>
      );
    }
  }, [isAuthenticated, activeUser, logoutUser, t]);

  return (
    <section className={css.navBarSection}>
      <header className={`${css.header} flex`}>
        <div className={css.logoDiv}>
          <NavLink to={"/"} className={`${css.logo} flex`}>
            <h1>
              <MdOutlineTravelExplore className="icon" />
              {t("navbar.title")}
            </h1>
          </NavLink>
        </div>
        <nav className={active}>
          <ul className={`flex ${css.navLists}`}>
            <li className={css.navItem}>
              <LanguageContextProvider>
                <ThemeContextProvider>
                  <SettingDropDown
                    thumbnail={<AiOutlineSetting className="icon" />}
                  />
                </ThemeContextProvider>
              </LanguageContextProvider>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <NavLink to={"/"} className={css.navLink}>
                {t("navbar.home")}
              </NavLink>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <NavLink to={"#"} className={css.navLink}>
                {t("navbar.governorates")}
              </NavLink>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <NavLink to={"#"} className={css.navLink}>
                {t("navbar.landmarks")}
              </NavLink>
            </li>

            <li className={css.navItem} onClick={removeNav}>
              <NavLink to={"/create_package"} className={css.navLink}>
                {t("navbar.recomendations")}
              </NavLink>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <NavLink to={"/aboutus"} className={css.navLink}>
                {t("navbar.aboutus")}
              </NavLink>
            </li>
            <li className={css.navItem} onClick={removeNav}>
              <NavLink to={"/contact"} className={css.navLink}>
                {t("navbar.contact")}
              </NavLink>
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
