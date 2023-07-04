import React from "react";
import { Box, CircularProgress } from "@mui/material";

const StandardLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
      }}
    >
      <CircularProgress
        thickness={5}
        size={60}
        sx={{ color: "var(--PrimaryColor)" }}
      />
    </Box>
  );
};

export default StandardLoader;
