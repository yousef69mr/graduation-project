import React, { Suspense } from "react";
import { useState } from "react";
import css from "./FormSelect.module.css";

const FormSelect = (props) => {
  const {
    type,
    label,
    name,
    placeholder,
    ref,
    value,
    onChange,
    pattern,
    header,
    options,
    required,
    errorMessage,
    onBlur,
    flex,
    width,
  } = props;
  // alert(JSON.stringify(options));
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <Suspense>
      <div
        className={css.formInput}
        style={{ flexGrow: flex, flexShrink: flex, width: width }}
      >
        <label>
          {label}
          {required ? <span>*</span> : ""}
        </label>
        <select
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          pattern={pattern}
          required={required}
          onBlur={handleFocus}
          focused={focused.toString()}
        >
          <option value="" key={-1}>
            {header}
          </option>
          {options && (
            <optgroup label={label?.toUpperCase()}>
              {options.map((option, i) => (
                <option value={option.value} key={i}>
                  {option.key}
                </option>
              ))}
            </optgroup>
          )}
        </select>

        <p>{errorMessage}</p>
      </div>
      {/* {subInputs?.map((input, i) =>
        createField(input, i, onChange, onBlur, subValues[i], data)
      )} */}
    </Suspense>
  );
};

export default FormSelect;
