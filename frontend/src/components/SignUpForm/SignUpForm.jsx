import React, { useReducer, lazy, useEffect } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import css from "./SignUpForm.module.css";
import { useNavigate, useHistory } from "react-router-dom";
import { t } from "i18next";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import axiosInstance from "../../axios";
// import axios from "axios";


const SignUpForm = (props) => {
  // const history = useHistory();
  const [requestState, updateRequestState] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    {
      potientialUser: undefined,
      success: null,
      redirect: false,
      message: "",
    }
  );

  const { data } = props;

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_COUNTRY":
          let country = data.countries?.find((n) => n.code === action.payload);
          // alert(country?.code);
          return {
            ...state,
            country: country,
            nationality: action.payload,
          };

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
      country: "",
      phone: "",
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
      unique: false,
      required: true,
    },
    {
      id: 2,
      tag: "input",
      type: "email",
      name: "email",
      pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$",
      unique: true,
      required: true,
    },
    {
      id: 3,
      tag: "input",
      type: "password",
      name: "password",
      pattern: "^[a-zA-Z0-9]{4,}$",
      unique: false,
      required: true,
    },
    {
      id: 4,
      tag: "input",
      type: "password",
      name: "confirmPassword",
      pattern: state.password,
      unique: false,
      required: true,
    },
    {
      id: 5,
      tag: "input",
      list: "country_list",
      name: "countries",
      pattern: "^[a-zA-Z]{2}$",
      unique: false,
      required: true,
    },
    {
      id: 6,
      tag: "select",
      name: "gender",
      pattern: ".*\\S.*",
      unique: false,
      required: true,
    },
    {
      id: 7,
      tag: "input",
      type: "tel",
      name: "phone",
      pattern: "^\\+[1-9]\\d{1,14}$",
      unique: true,
      required: true,
    },
  ];

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      username: state.username,
      email: state.email,
      password: state.password,
      phone: `+${state.country.phone}${state.phone}`,
      nationality: state.nationality,
      gender: state.gender,
    };
    // alert(JSON.stringify(user));

    // alert(JSON.stringify(requestState));
    axiosInstance.post(`register/`, user).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert(JSON.stringify(requestState));
      updateRequestState({
        success: true,
        redirect: true,
        message: `User created successfully`,
      });
    });
    // await fetch("http://127.0.0.1:8000/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(user),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     alert(JSON.stringify(requestState));
    //     updateRequestState({
    //       success: true,
    //       redirect: true,
    //       message: `User created successfully`,
    //     });
    //   })
    //   .catch((error) => {
    //     updateRequestState({
    //       success: false,
    //       potientialUser: null,
    //       message: error,
    //     });
    //     alert(JSON.stringify(requestState));
    //   });
  };
  let navigate = useNavigate();
  // useEffect(() => {
  //   if (requestState.redirect) {
  //     // alert("success");
  //     return navigate("/login_signup");
  //   }
  // }, [requestState.redirect]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "countries") {
      dispatch({
        type: "SET_COUNTRY",
        payload: value.toUpperCase().trim(),
      });
    } else if (name === "phone") {
      if (value.startsWith(`+${state.country.phone}`)) {
        const modifiedValue = value.replace(`+${state.country.phone}`, "");
        if (modifiedValue.startsWith("0")) {
          modifiedValue = modifiedValue.split(1);
        }
        dispatch({ phone: modifiedValue });
      }
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
            <FormInput
              type={input.type}
              name={input.name}
              value={
                input.name === "phone"
                  ? `+${state.country ? state.country.phone : ""}${state.phone}`
                  : input.name === "countries"
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
              key={input.id}
            />
          ) : (
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
              key={input.id}
            />
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
