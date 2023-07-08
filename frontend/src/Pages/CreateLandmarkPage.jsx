import React from "react";
import Box from "@mui/material/Box";
import AlertContextProvider from "../contexts/AlertContext";
import CategoriesContextProvider from "../contexts/CategoriesContext";
import LanguageContextProvider from "../contexts/LanguageContext";
import CreateLandmarkForm from "../components/CreateLandmarkForm/CreateLandmarkForm";
import GovernorateContextProvider from "../contexts/GovernorateContext";

const CreateLandmarkPage = () => {
  return (
    <Box
      sx={{
        minHeight: `${window.innerHeight - 160}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LanguageContextProvider>
        <CategoriesContextProvider>
          <GovernorateContextProvider>
            <AlertContextProvider>
              <CreateLandmarkForm />
            </AlertContextProvider>
          </GovernorateContextProvider>
        </CategoriesContextProvider>
      </LanguageContextProvider>
    </Box>
  );
};

export default CreateLandmarkPage;
