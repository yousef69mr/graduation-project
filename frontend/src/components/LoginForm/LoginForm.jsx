import React, { useReducer, useState, useEffect } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import css from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import { t } from "i18next";
import Cookies from "js-cookie";
// import { AxiosInstance } from "axios";

const inputs = [
  {
    id: 1,
    type: "text",
    name: "email",
    pattern: "^[0-9]+$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$",
    required: true,
  },
  {
    id: 2,
    type: "password",
    name: "password",
    required: true,
  },
];

const LoginForm = (props) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      email: "",
      password: "",
    }
  );

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: state.email.toLowerCase(),
        password: state.password,
      }),
    })
      .then((res) => {
        alert(JSON.stringify(res));
        Cookies.set("access_token", localStorage.getItem("access_token"), {
          path: "/",
        });
        // axios.defaults.headers["Authorization"] =
        //   "JWT " + localStorage.getItem("access_token");
        // history.push("");
        // location.reload();
      })
      .catch((err) => console.log(err));
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (isRedirect) {
      // console.log(isRedirect, "yyyy");
      // setIsPotentialLogin(true);

      return navigate("/dashboard");
    }
  }, [isRedirect]);

  return (
    <form method="post" onSubmit={SubmitHandler}>
      <h1>{t("signinform.title")}</h1>

      <div className={css.social_container}>
        <a href="#" className={css.social} title="facebook">
          <FaFacebook className="icon" />
        </a>
        <a href="#" className={css.social} title="google">
          <FaGoogle className="icon" />
        </a>
        <a href="#" className={css.social} title="twitter">
          <FaTwitter className="icon" />
        </a>
      </div>
      <p>or use your account</p>
      {inputs.map((input, i) => (
        <FormInput
          type={input.type}
          name={input.name}
          value={state[input.name]}
          onChange={(e) => dispatch({ [e.target.name]: e.target.value })}
          placeholder={t(`signinform.inputs.${i}.placeholder`)}
          label={t(`signinform.inputs.${i}.label`)}
          pattern={input.pattern}
          errorMessage={t(`signinform.inputs.${i}.errorMessage`)}
          required={input.required}
          key={input.id}
        />
      ))}
      <a href="#">{t("signinform.forgetPassword")}</a>
      <button className={props.btn} type="submit">
        {t("signinform.login")}
      </button>
    </form>
  );
};

export default LoginForm;
