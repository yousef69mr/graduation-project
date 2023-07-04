import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SnackbarContent from "@mui/material/SnackbarContent";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { useAlertContext } from "../contexts/AlertContext";

const MultiMessageSnackbar = () => {
  const { messages } = useAlertContext();
  //   alert(messages);
  const [open, setOpen] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);

  useEffect(() => {
    if (messages.length > 0) {
      alert(messages);
      setMessageQueue((prevQueue) => [...prevQueue, ...messages]);
    }
  }, [messages]);

  useEffect(() => {
    if (messageQueue.length > 0 && !open) {
      //  const [nextMessage, ...rest] = messageQueue;
      // setMessageQueue(rest);
      // setOpen(true);
    }
  }, [messageQueue, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000} // set the duration for which the snackbar should be displayed
      onClose={handleClose}
      onExited={handleExited}
    >
      <Box>
        {messageQueue?.slice(0, 1).map((message, index) => (
          <SnackbarContent
            key={index}
            message={message.text}
            color={message.status}
            action={
              <IconButton size="small" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        ))}
      </Box>
    </Snackbar>
  );
};

export default MultiMessageSnackbar;
