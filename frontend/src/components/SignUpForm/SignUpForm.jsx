import React, { useReducer, useContext } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import css from "./SignUpForm.module.css";
// import { useNavigate, useHistory } from "react-router-dom";
import { t } from "i18next";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import InputContainer from "../InputContainer/InputContainer";
import axios from "axios";
// import { backendAPI } from "../../index";
import api from "../../axios";
import { AlertContext } from "../../contexts/AlertContext";

const SignUpForm = (props) => {
  const { data } = props;
  const { AlertHandler } = useContext(AlertContext);

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        default:
          return {
            ...state,
            ...action,
          };
      }
    },
    {
      username: "",
      password: "",
      email: "",
      nationality: "",
      phone: "",
      phoneCode: "",
      gender: "",
    }
  );

  const inputs = [
    {
      id: 1,
      tag: "input",
      type: "text",
      name: "username",
      pattern: "^[a-zA-Z0-9]{3,16}$",
      flex: 1,
      unique: false,
      required: true,
    },
    {
      id: 2,
      tag: "input",
      type: "email",
      name: "email",
      pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$",
      flex: 1,
      unique: true,
      required: true,
    },
    {
      id: 3,
      tag: "input",
      type: "password",
      name: "password",
      pattern: "^[a-zA-Z0-9]{4,}$",
      flex: 1,
      unique: false,
      required: true,
    },
    {
      id: 4,
      tag: "input",
      type: "password",
      name: "confirmPassword",
      pattern: state.password,
      flex: 1,
      unique: false,
      required: true,
    },
    {
      id: 5,
      tag: "input",
      list: "country_list",
      name: "countries",
      label: "nationality",
      pattern: "^[a-zA-Z]{2}$",
      flex: 1,
      unique: false,
      required: true,
    },
    {
      id: 6,
      tag: "select",
      name: "gender",
      pattern: ".*\\S.*",
      flex: 1,
      unique: false,
      required: true,
    },
    {
      id: 7,
      tag: "input",
      type: "tel",
      name: "phone",
      pattern: "^\\[1-9]\\d{1,12}$",
      flex: 3,
      width: "50%",
      unique: true,
      required: true,
      subInput: {
        id: 1,
        tag: "select",
        name: "phoneCode",
        pattern: ".*\\S.*",
        flex: 1,
        width: "50%",
        unique: false,
        required: true,
      },
    },
  ];

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      username: state.username,
      email: state.email,
      password: state.password,
      phone: `${state.phoneCode}${state.phone}`,
      nationality: state.nationality,
      gender: state.gender,
    };

    api.api
      .post("create_user/", user)
      .then((response) => {
        if (response.status === 201) {
          console.log("created");
          AlertHandler("UPDATE", {
            message: "User Created Successfully :)",
            alertTheme: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "countries") {
      dispatch({ nationality: value.toUpperCase().trim() });
    } else if (name === "phone") {
      let modifiedValue = value;

      if (modifiedValue.startsWith("0")) {
        modifiedValue = modifiedValue.slice(1);
      }
      dispatch({ phone: modifiedValue });
    } else {
      dispatch({ [name]: value });
    }
  };

  const onBlur = (name, value) => {
    // const { name, value } = e.target;
    const input = inputs.find((i) => i.name === name);
    // console.log(input,name);
    if (input.unique) {
      // axios.get(``)
      // console.log(input);
    }
  };

  const subInputsHandler = (input, index) => {
    if (input.name === "phone") {
      const options = data.countries?.map((value) =>
        Object.assign({
          key: `(+${value.phone}) ${value.label}`,
          value: `+${value.phone}`,
        })
      );

      // console.log(values, keys);
      // console.log(options);
      return (
        <FormSelect
          name={input.subInput.name}
          value={state[input.subInput.name]}
          onChange={onChange}
          placeholder={t(`signupform.inputs.${index}.subInput.label`)}
          label={t(`signupform.inputs.${index}.subInput.label`)}
          pattern={input.subInput.pattern}
          errorMessage={t(`signupform.inputs.${index}.subInput.errorMessage`)}
          required={input.subInput.required}
          header={t(`signupform.inputs.${index}.subInput.header`)}
          options={options}
          flex={input.subInput.flex}
          key={input.subInput.id}
          width={!input.width ? "100%" : input.subInput.width}
        />
      );
    }
  };
  return (
    <React.Fragment>
      <form method="post" onSubmit={SubmitHandler}>
        <h1>{t("signupform.title")}</h1>

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
        <p>or use your email for registeration</p>
        {inputs.map((input, i) =>
          input.tag === "input" ? (
            <InputContainer key={i}>
              {subInputsHandler(input, i)}
              <FormInput
                type={input.type}
                name={input.name}
                value={
                  input.name === "countries"
                    ? state[input.label]
                    : state[input.name]
                }
                onChange={onChange}
                placeholder={t(`signupform.inputs.${i}.placeholder`)}
                label={t(`signupform.inputs.${i}.label`)}
                pattern={input.pattern}
                errorMessage={t(`signupform.inputs.${i}.errorMessage`)}
                required={input.required}
                list={input.list}
                dataList={data[input.name]}
                onBlur={() => onBlur(input.name)}
                flex={input.flex}
                key={input.id}
                width={!input.width ? "100%" : input.width}
              />
            </InputContainer>
          ) : (
            <InputContainer key={i}>
              <FormSelect
                name={input.name}
                value={state[input.name]}
                onChange={onChange}
                placeholder={t(`signupform.inputs.${i}.label`)}
                label={t(`signupform.inputs.${i}.label`)}
                pattern={input.pattern}
                errorMessage={t(`signupform.inputs.${i}.errorMessage`)}
                required={input.required}
                header={t(`signupform.inputs.${i}.header`)}
                options={data[input.name]}
                flex={input.flex}
                key={input.id}
                width={!input.width ? "100%" : input.width}
              />
            </InputContainer>
          )
        )}
        <button className={props.btn} type="submit">
          {t("signupform.submit")}
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUpForm;
