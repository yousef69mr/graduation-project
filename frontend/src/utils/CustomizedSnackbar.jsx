import React, { forwardRef, useState, useContext } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { AlertContext } from "../contexts/AlertContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar(props) {
  const [open, setOpen] = useState(true);
  //alertTheme = ['success','error','info','warning']
  //Alert data
  const { message, alertTheme ,resetAlert} = useContext(AlertContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    resetAlert();
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          // anchorOrigin={(vertical, horizontal)}
        >
          <Alert onClose={handleClose} severity={alertTheme}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
}
