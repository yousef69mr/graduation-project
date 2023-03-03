import React, { useEffect } from "react";
import css from "./LoginSignupSlider.module.css";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";
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
          <SignUpForm btn={css.btn} data={data} />
        </div>
      </div>
      <div className={css.overlay_container}>
        <div className={css.overlay}>
          <div className={css.overlay_left}>
            <h1>Welcome back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className={css.btn} onClick={() => setActive("")}>
              Sign In
            </button>
          </div>
          <div className={css.overlay_right}>
            <h1>Hello, friend</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className={css.btn}
              onClick={() => setActive(`${css.right_panel_active}`)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupSlider;
