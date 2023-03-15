import React from "react";
import css from "./InputContainer.module.css";

const InputContainer = (props) => {
  // const { k } = props;
  return (
    <div className={css.inputContainer}>
      {props.children}
    </div>
  );
};

export default InputContainer;
