import React, { useCallback, useState, useRef, useContext } from "react";
// import { useFormik } from "formik";
// import FormikController from "./FormikController";
import api from "../../../Apis/Base";
import Box from "@mui/material/Box";

import { string, mixed, object } from "yup";
import StandardForm from "./StandardForm";

import { useTranslation } from "react-i18next";
import axios from "axios";
import { OrganizationContext } from "../../../contexts/OrganizationContext";

const CreateOrganizationForm = () => {
  const formName = "CreateOrganizationForm";
  const { dispatch } = useContext(OrganizationContext);
  const { t } = useTranslation();
  const inputs = {
    title: "",
    fields: [
      {
        name: "organizationName",
        autoFocus: true,
        control: "input",
        type: "text",
        required: true,
      },
      {
        name: "legalDocument",
        // label: "legalDocuments",
        control: "file",
        required: true,
        dimensions: { width: "500", height: "400" },
      },
    ],
    validationSchema: object().shape({
      organizationName: string()
        .required(t("form.requiredField"))
        .min(5, "5 characters"),
      legalDocument: mixed()
        .required(t("form.requiredField"))
        .test("fileType", t("form.invalidFileType"), function(value) {
          // if (!value) return true; // allow empty value
          return [
            "application/pdf",
            "application/msword",
            "image/png",
          ].includes(value.type);
        }),
    }),
  };
  const initialValues = {
    organizationName: "",
    legalDocument: null,
  };

  const submitfunction = async (values, { setSubmitting, setErrors }) => {
    // alert(JSON.stringify(values));
    // alert(values.legalDocument.name);

    if (values.legalDocument !== null) {
      const cancelToken = axios.CancelToken.source();
      // {
      //   organization_name: values.organizationName,
      //   document: values.legalDocument,
      // }
      const dataForm = new FormData();
      dataForm.append("organization_name", values.organizationName);
      dataForm.append("document", values.legalDocument);

      await api.apiToken
        .post(`organizations/`, dataForm, { cancelToken: cancelToken.token })
        .then((response) => {
          alert(JSON.stringify(response.data));
          // console.log(response.statusText);
          dispatch({ organizationName: response.data.organization_name });
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("cancelled");
          } else {
            alert(error.message);
          }
          setErrors({
            submit: "An error occurred while submitting the form.",
          });
        })
        .finally(() => setSubmitting(false));

      return () => {
        cancelToken.cancel("Request cancelled by user");
      };
    }
  };

  return (
    <Box className="outer_container">
      <Box className="inner_container">
        <StandardForm
          formName={formName}
          initialvalues={initialValues}
          inputs={inputs}
          submitfunction={submitfunction}
        />
      </Box>
    </Box>
  );
};

export default CreateOrganizationForm;
