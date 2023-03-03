import React from "react";
import css from "./ChatBot.module.css";
import { BsChatText } from "react-icons/bs";
const ChatBot = () => {
  return (
    <div className={css.main}>
      <button className={css.btn}>
        <BsChatText className="icon" />
      </button>
    </div>
  );
};

export default ChatBot;
