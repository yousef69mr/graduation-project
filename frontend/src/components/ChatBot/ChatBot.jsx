import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
// import Box from "@mui/material/Box";

import CircularProgress from "@mui/material/CircularProgress";
// import "./chat.css";
import axios from "axios";
import api_root, { token } from "../../axios";
import { BsChatText } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import css from "./Chatbot.module.css";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../contexts/LanguageContext";

const Chatbot = () => {
  const { t } = useTranslation();
  // let randomNumbers = "";
  // for (let i = 0; i < 10; i++) {
  //   randomNumbers += Math.floor(Math.random() * 10);
  // }
  const welcomeMessages = t("chatbot.welcome_messages", {
    returnObjects: true,
  });

  const { currentLanguageCode } = useLanguageContext();
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)],
      sender: css.bot,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const sendMessage = async (text) => {
    if (text) {
      setMessages([...messages, { text: text, sender: css.user }]);
      debugger;
      setIsLoading(true);
      let cancelToken;
      try {
        const formData = new FormData();
        formData.append("message", text);
        formData.append("session_id", sessionId);
        formData.append("language_code", currentLanguageCode);
        if (token) {
          const response = await api_root.apiToken.post("chatbot/", formData, {
            cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
          });

          const message = response.data;
          // alert(JSON.stringify(data));
          debugger;
          setMessages([
            ...messages,
            { text: text, sender: css.user },
            { text: message.response, sender: css.bot },
          ]);
          debugger;
        } else {
          const response = await api_root.api.post("chatbot/", formData, {
            cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
          });

          const message = response.data;
          // alert(JSON.stringify(data));
          setMessages([
            ...messages,
            { text: message.response, sender: css.bot },
          ]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setInputValue("");
      }

      return () => {
        if (cancelToken) {
          cancelToken();
        }
      };
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      sendMessage(inputValue.trim());
    }
  };

  // Use react-spring to animate the chat messages
  const messagesSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
  });

  // Use useEffect to scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    const chatContainer = inputRef.current.parentNode;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const handleChatbotDisplay = () => {
    if (!open) {
      let randomNumbers = "";
      for (let i = 0; i < 10; i++) {
        randomNumbers += Math.floor(Math.random() * 10);
      }
      setSessionId(randomNumbers);
      setMessages([
        {
          text: welcomeMessages[
            Math.floor(Math.random() * welcomeMessages.length)
          ],
          sender: css.bot,
        },
      ]);
    }

    setOpen((prev) => !prev);
  };

  return (
    <div className={css.main}>
      <button className={css.btn} onClick={handleChatbotDisplay}>
        <BsChatText className="icon" />
      </button>

      <div className={`${css.chatbot_container} ${open ? css.open : ""}`}>
        <div className={css.close}>
          <button className={css.close_btn} onClick={handleChatbotDisplay}>
            <AiOutlineClose className="icon" />
          </button>
        </div>
        <div className={css.chatbot_messages} ref={inputRef}>
          {messages.map((message, index) => (
            <animated.div
              key={index}
              className={`${css.message} ${message.sender}`}
              style={
                message.sender === css.bot
                  ? messagesSpring
                  : { transform: "none" }
              }
            >
              {message.text}
            </animated.div>
          ))}
        </div>
        <div className={css.chatbot_input}>
          <input
            type="text"
            placeholder={t("chatbot.input_placeholder")}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <button disabled={isLoading} onClick={() => sendMessage(inputValue)}>
            {isLoading ? <CircularProgress className="icon" /> : t("send")}
          </button>
        </div>
      </div>
    </div>
  );
};

// const Chatbot = () => {
//   // const [sessionId, setSessionId] = useState(0);
//   // const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: "Hi there! How can I help you today?", sender: "bot" },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const inputRef = useRef(null);

//   const sendMessage = (text) => {
//     setMessages([...messages, { text, sender: "user" }]);
//     setInputValue("");
//   };

//   const handleInputKeyPress = (event) => {
//     if (event.key === "Enter" && inputValue.trim() !== "") {
//       sendMessage(inputValue.trim());
//     }
//   };

//   // Use react-spring to animate the chat messages
//   // const messagesSpring = useSpring({
//   //   from: { opacity: 0, transform: "translateY(20px)" },
//   //   to: { opacity: 1, transform: "translateY(0px)" },
//   //   delay: 200,
//   // });

//   // Use useEffect to scroll to the bottom of the chat when new messages are added
//   useEffect(() => {
//     const chatContainer = inputRef.current.parentNode;
//     chatContainer.scrollTop = chatContainer.scrollHeight;
//   }, [messages]);

//   return (
//     <Box className={css.main}>
//       <button className={css.btn} /*onClick={() => setOpen((prev) => !prev)}*/>
//         <BsChatText className="icon" />
//       </button>

//       {/* {open && (
//         <div className={css.chatbot_container}>
//           <div className={css.chatbot_messages} ref={inputRef}>
//             {messages.map((message, index) => (
//               <animated.div
//                 key={index}
//                 className={`{message} ${message.sender}`}
//                 style={
//                   message.sender === "bot"
//                     ? messagesSpring
//                     : { transform: "none" }
//                 }
//               >
//                 {message.text}
//               </animated.div>
//             ))}
//           </div>
//           <div className="chatbot-input">
//             <input
//               type="text"
//               placeholder="Type your message here..."
//               value={inputValue}
//               onChange={(event) => setInputValue(event.target.value)}
//               onKeyPress={handleInputKeyPress}
//             />
//             <button onClick={() => sendMessage(inputValue)}>Send</button>
//           </div>
//         </div>
//       )} */}
//     </Box>
//   );
// };

// import React, { useState } from 'react';
// import { useSpring, animated } from 'react-spring';
// import styles from './Chatbot.module.css';

// function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: 'Hi there! How can I assist you today?', isBot: true }
//   ]);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   }

//   const sendMessage = () => {
//     setIsLoading(true);

//     // Simulate a delay to show the loading message
//     setTimeout(() => {
//       setIsLoading(false);
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { text: 'How can I assist you further?', isBot: true }
//       ]);
//     }, 2000);
//   }

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       sendMessage();
//     }
//   }

//   const chatbotAnimation = useSpring({
//     transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
//     opacity: isOpen ? 1 : 0,
//     config: { duration: 300 }
//   });

//   return (
//     <animated.div className={styles.chatbotContainer} style={chatbotAnimation}>
//       <div className={styles.chatbotHeader} onClick={toggleChatbot}>
//         <h3>Chat with our Bot</h3>
//         <button className={styles.chatbotToggleBtn}>+</button>
//       </div>
//       <div className={styles.chatbotBody}>
//         {messages.map((message, index) => (
//           <div key={index} className={`${styles.chatbotMessageContainer}${message.isBot ? '' : ` ${styles.userMessage}`}`}>
//             <div className={styles.chatbotMessage}>
//               <p>{message.text}</p>
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className={styles.loadingMessage}>
//             <div className={styles.chatbotMessage}>
//               <p>Loading...</p>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className={styles.chatbotInputContainer}>
//         <input type="text" placeholder="Type your message..." onKeyPress={handleKeyPress} />
//         <button className={styles.chatbotSendBtn} onClick={sendMessage}>Send</button>
//       </div>
//     </animated.div>
//   );
// }

export default Chatbot;
