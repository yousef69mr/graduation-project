import React from "react";
// import { useSpring, animated } from "react-spring";
// import Box from "@mui/material/Box";
import css from "./Chatbot.module.css";
// import "./chat.css";
import { BsChatText } from "react-icons/bs";

const Chatbot = () => {
  return (
    <div className={css.main}>
      <button className={css.btn}>
        <BsChatText className="icon" />
      </button>
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
