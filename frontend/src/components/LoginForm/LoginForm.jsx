import React, { useReducer } from "react";
// import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
// import css from "./LoginForm.module.css";

import FormInput from "../FormInput/FormInput";
import { t } from "i18next";
import { useAuthContext } from "../../contexts/AuthContext";
import InputContainer from "../InputContainer/InputContainer";

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

  const { loginUser } = useAuthContext();

  return (
    <form method="POST" onSubmit={loginUser}>
      <h1>{t("signinform.title")}</h1>

      {/* <div className={css.social_container}>
        <a href="#" className={css.social} title="facebook">
          <FaFacebook className="icon" />
        </a>
        <a href="#" className={css.social} title="google">
          <FaGoogle className="icon" />
        </a>
        <a href="#" className={css.social} title="twitter">
          <FaTwitter className="icon" />
        </a>
      </div> */}
      <p>or use your account</p>
      {inputs.map((input, i) => (
        <InputContainer key={input.id}>
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
          />
        </InputContainer>
      ))}
      {/* <a href="#">{t("signinform.forgetPassword")}</a> */}
      <button className={props.btn} type="submit">
        {t("signinform.login")}
      </button>
    </form>
  );
};

export default LoginForm;
