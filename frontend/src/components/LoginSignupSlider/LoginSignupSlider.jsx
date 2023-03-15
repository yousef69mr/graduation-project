import React, { useEffect } from "react";
import css from "./LoginSignupSlider.module.css";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
import AlertContextProvider from "../../contexts/AlertContext";
import { useState } from "react";
import { t } from "i18next";
import Data from "../../Data/data.json";

const LoginSignupSlider = () => {
  const [active, setActive] = useState("");
  const [data, setData] = useState(Data);
  useEffect(() => {
    setData(Data);
  }, [data]);
  return (
    <div className={`${css.container} ${active}`}>
      <div className={css.form_container}>
        <div className={css.signin}>
          <LoginForm btn={css.btn} />
        </div>
        <div className={css.signup}>
          <AlertContextProvider>
            <SignUpForm btn={css.btn} data={data} />
          </AlertContextProvider>
        </div>
      </div>
      <div className={css.overlay_container}>
        <div className={css.overlay}>
          <div className={css.overlay_left}>
            <h1>{t("LoginSignupSlider.left_overlay.title")}</h1>
            <p>{t("LoginSignupSlider.left_overlay.message")}</p>
            <button className={css.btn} onClick={() => setActive("")}>
              {t("LoginSignupSlider.left_overlay.button")}
            </button>
          </div>
          <div className={css.overlay_right}>
            <h1>{t("LoginSignupSlider.right_overlay.title")}</h1>
            <p>{t("LoginSignupSlider.right_overlay.message")}</p>
            <button
              className={css.btn}
              onClick={() => setActive(`${css.right_panel_active}`)}
            >
              {t("LoginSignupSlider.right_overlay.button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupSlider;
