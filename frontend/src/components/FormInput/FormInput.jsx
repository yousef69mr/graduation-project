import React, { Suspense, useState, useEffect } from "react";
import css from "./FormInput.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { CircularProgress } from "@mui/material";
import createField from "../../utils/CreateInput";

const FormInput = (props) => {
  const {
    type,
    label,
    name,
    placeholder,
    ref,
    value,
    onChange,
    pattern,
    list,
    dataList,
    required,
    errorMessage,
    onBlur,
    width,
    flex,
  } = props;

  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [serverMessage, setServerMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState(props.errorMessage);

  const handleFocus = (e) => {
    setFocused(true);
    if (onBlur) {
      // alert("here")
      setLoading(true);
    }
    // onBlur(e);
    // setLoading(false);
    // setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    if (loading) {
      onBlur(name, value);
      // setInterval(()=>{},3000);
      setLoading(false);
    }
  }, [loading, value, name]);

  //password reveal toggle
  const [passwordType, setPasswordType] = useState("");
  useEffect(() => {
    if (type === "password") {
      setPasswordType(type);
    }
  }, [type]);
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  return (
    <Suspense>
      <div
        className={css.formInput}
        style={{ flexGrow: flex, width: width }}
      >
        <label>
          {label}
          {required ? <span>*</span> : ""}
        </label>
        <input
          list={list}
          ref={ref}
          type={passwordType === "" ? type : passwordType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          pattern={pattern}
          required={required}
          onBlur={handleFocus}
          focused={focused.toString()}
        />
        {type === "password" && (
          <span onClick={togglePassword}>
            {passwordType === "password" ? (
              <AiOutlineEyeInvisible />
            ) : (
              <AiOutlineEye />
            )}
          </span>
        )}
        {dataList && (
          <datalist id={list}>
            {dataList.map((data, i) => (
              <option value={data.code} key={i}>
                {data.label}
              </option>
            ))}
          </datalist>
        )}
        <h6>{loading ? <CircularProgress className={css.icon} /> : ""}</h6>
        <p>{errorMessage}</p>
      </div>
      {/* {subInputs?.map((input, i) =>
        createField(input, i, onChange, onBlur, subValues[i], data)
      )} */}
    </Suspense>
  );
};

export default FormInput;
