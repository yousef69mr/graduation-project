import React from "react";
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
  } = props;
  // alert(JSON.stringify(options));
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className={css.formInput}>
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
        <option value="">{header}</option>
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
  );
};

export default FormSelect;
