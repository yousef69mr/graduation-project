import React, { useState } from "react";
import { useFormik } from "formik";
import FormikController from "./FormikController";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import CircularProgress from "@mui/material/CircularProgress";
import StandardLoader from "../../Helper/Loader";

import { ImBin } from "react-icons/im";
import { useTranslation } from "react-i18next";

// const steps = [
//   {
//     label: "Step 1",
//     fields: [
//       {
//         name: "image",
//         control: "file",
//         label: "Image",
//         required: true,
//       },
//       {
//         name: "firstName",
//         control: "input",
//         type: "text",
//         label: "First Name",
//         required: true,
//         autoFocus: true,
//       },
//       {
//         name: "lastName",
//         control: "input",
//         type: "text",
//         required: true,
//         label: "Last Name",
//       },
//       {
//         name: "email",
//         control: "input",
//         type: "email",
//         label: "Email",
//         required: true,
//       },
//       {},
//     ],
//     validationSchema: Yup.object({
//       image: Yup.mixed()
//         .required("Image is required")
//         .test("fileType", "Invalid file type", (value) => {
//           // Check if the file type is valid
//           return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
//         }),
//       firstName: Yup.string().required("Required"),
//       lastName: Yup.string().required("Required"),
//       email: Yup.string().email("Invalid email address").required("Required"),
//     }),
//   },
//   {
//     label: "Step 2",
//     fields: [
//       { name: "address", control: "textarea", label: "Address" },
//       {
//         name: "city",
//         control: "select",
//         required: true,
//         options: [
//           { key: "lav", value: "value" },
//           { key: "lav2", value: "value2" },
//           { key: "lav3", value: "value3" },
//         ],
//         label: "City",
//         renderOption: (props, option) => (
//           <Box
//             component="li"
//             sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
//             {...props}
//             // value={option.value}
//           >
//             {option.key} {option.value}
//           </Box>
//         ),
//         renderInput: (params) => (
//           <TextField
//             {...params}
//             label="Choose a city"
//             inputProps={{
//               ...params.inputProps,
//               autoComplete: "new-password", // disable autocomplete and autofill
//             }}
//           />
//         ),
//       },
//       //   {
//       //     name: "state",
//       //     control: "radio",
//       //     label: "State",
//       //     options: ["CA", "TX"],
//       //   },
//     ],
//     validationSchema: Yup.object({
//       address: Yup.string(),
//       city: Yup.string().required("Required"),
//       //   state: Yup.string().required("Required"),
//     }),
//   },
//   {
//     label: "Step 3",
//     fields: [
//       {
//         name: "username",
//         control: "input",
//         type: "text",
//         label: "Username",
//         autoFocus: true,
//         required: true,
//       },
//       {
//         name: "password",
//         control: "input",
//         type: "password",
//         label: "Password",
//         type: "password",
//         required: true,
//       },
//       {
//         name: "confirmPassword",
//         control: "input",
//         type: "password",
//         label: "Confirm Password",
//         type: "password",
//         required: true,
//       },
//     ],
//     validationSchema: Yup.object({
//       username: Yup.string().required("Required"),
//       password: Yup.string().required("Required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Required"),
//     }),
//   },
// ];

const MultiStepForm = (props) => {
  const { formName, steps, initialvalues, submitfunction } = props;
  // const [submitPanel, setSubmitPanel] = useState(false);
  const [activeStep, setActiveStep] = useState(3);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: steps[activeStep]?.validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      // console.log(isLastStep);
      if (!isLastStep) {
        handleNext();
        setSubmitting(false);
        return;
      }

      // setSubmitPanel(true);

      submitfunction(values, { setSubmitting, setErrors });

      // console.log(values);
    },
  });

  const handleAddItem = (name) => {
    formik.setFieldValue(name, [
      ...formik.values[name],
      ...formik.initialValues[name],
    ]);
  };

  const handleRemoveItem = (name, index) => {
    formik.setFieldValue(
      name,
      formik.values[name].filter((item, i) => i !== index)
    );
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stepper
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--textColor)", // change the border color
          },
          "& .MuiStepLabel-label.Mui-completed": {
            color: "var(--textColor)",
            textDecoration: "line-through",
            textDecorationThickness: "1.3px",
            textDecorationColor: "var(--PrimaryColor)",
          },
          "& .MuiStepIcon-root .MuiSvgIcon-root": {
            color: "var(--PrimaryColor) !important",
          },
          // "& .MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
          //   color: "var(--textColor)",
          // },
        }}
        className="text-color"
        activeStep={activeStep}
      >
        {steps.map((step, i) => (
          <Step key={i}>
            <StepLabel
              // sx={{ color: "var(--textColor) !important" }}
              sx={{
                "& .MuiStepIcon-root": {
                  margin: "0 0rem 0 0.3rem",
                  fill: "var(--PrimaryColor)",
                },
              }}
              classes={{
                labelContainer: "text-color",
                label: activeStep === i ? "primary-color" : "",
              }}
              // className="text-color"
            >
              {t(`${formName}.steps.${i}.title`)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ width: "100%", margin: "1rem 0rem" }}>
        {steps[activeStep]?.fields.map(
          (
            {
              name,
              // label,
              autoFocus,
              type,
              control,
              required,
              options,
              dir,
              // renderOption,
              // renderInput,
              // renderTags,
              firstOption,
              condition,
              placeholder,
              helperText,
              fields,
              isMultiple,
              isList,
              range,
              disabled,
              dimensions,
            },
            index
          ) =>
            condition ? (
              formik.values[condition.field] === condition.value && (
                <Box sx={{ mt: 1, mb: 1 }} key={index}>
                  <FormikController
                    name={name}
                    label={t(
                      `${formName}.steps.${activeStep}.fields.${index}.label`
                    )}
                    control={control}
                    // variant="outlined"
                    autoFocus={autoFocus}
                    type={type}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required={required}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    errorText={formik.touched[name] && formik.errors[name]}
                    helperText={
                      helperText &&
                      `${formName}.steps.${activeStep}.fields.${index}.helperText`
                    }
                    options={options}
                    dir={dir && dir}
                    // firstoption={
                    //   firstOption
                    //     ? firstOption
                    //     : {
                    //         key: t(
                    //           `${formName}.steps.${activeStep}.fields.${index}.firstOption`
                    //         ),
                    //         value: "",
                    //       }
                    // }
                    placeholder={
                      placeholder &&
                      t(
                        `${formName}.steps.${activeStep}.fields.${index}.placeholder`
                      )
                    }
                    disabled={
                      disabled.condition ? disabled.condition : disabled
                    }
                    dimensions={dimensions && dimensions}
                    range={range && range}
                    ismultiple={isMultiple}
                    // getoptionlabel={
                    //   options && ((option) => option && option?.key)
                    // }
                    // renderTags={options && renderTags && renderTags}
                    // renderInput={options && renderInput && renderInput}
                    // renderOption={options && renderOption && renderOption}
                    setfieldvalue={formik.setFieldValue}
                  />
                </Box>
              )
            ) : !isList ? (
              <Box sx={{ mt: 1, mb: 1 }} key={index}>
                <FormikController
                  name={name}
                  label={t(
                    `${formName}.steps.${activeStep}.fields.${index}.label`
                  )}
                  control={control}
                  // variant="outlined"
                  autoFocus={autoFocus}
                  type={type}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required={required}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  errorText={formik.touched[name] && formik.errors[name]}
                  helperText={
                    helperText &&
                    t(
                      `${formName}.steps.${activeStep}.fields.${index}.helperText`
                    )
                  }
                  options={options && options}
                  dir={dir && dir}
                  placeholder={
                    placeholder &&
                    t(
                      `${formName}.steps.${activeStep}.fields.${index}.placeholder`
                    )
                  }
                  // firstoption={
                  //   firstOption
                  //     ? firstOption
                  //     : {
                  //         key: t(
                  //           `${formName}.steps.${activeStep}.fields.${index}.firstOption`
                  //         ),
                  //         value: "",
                  //       }
                  // }
                  range={range && range}
                  disabled={disabled?.condition ? disabled.condition : disabled}
                  dimensions={dimensions && dimensions}
                  ismultiple={isMultiple}
                  // getoptionlabel={
                  //   options && ((option) => option && option?.key)
                  // }
                  // renderTags={options && renderTags && renderTags}
                  // renderInput={options && renderInput && renderInput}
                  // renderOption={options && renderOption && renderOption}
                  setfieldvalue={formik.setFieldValue}
                />
              </Box>
            ) : (
              <Box sx={{ mt: 1, mb: 1 }} key={index}>
                <Box>
                  <Typography variant="h4" className="text-color">
                    {t(`${formName}.steps.${activeStep}.title`)}
                  </Typography>
                  <Button
                    className="btn text-color"
                    onClick={() => handleAddItem(name)}
                  >
                    {t("addTickets")}
                  </Button>
                </Box>
                {formik.values[name].length > 0 &&
                  formik.values[name]?.map((array, i) => (
                    <Box className="row" padding={3} key={i}>
                      {fields.map((input, j) => (
                        <Container sx={{ mt: 1, mb: 1 }} key={j}>
                          <FormikController
                            name={`${name}[${index}].${input.name}`}
                            label={t(
                              `${formName}.steps.${activeStep}.fields.${j}.label`
                            )}
                            control={input.control}
                            // variant="outlined"
                            autoFocus={input.autoFocus}
                            type={input.type}
                            value={formik.values[input.name]}
                            // onChange={
                            //   control === "select"
                            //     ? (e, option) =>
                            //         formik.setFieldValue(name, option?.value)
                            //     : formik.handleChange
                            // }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required={input.required}
                            dir={dir && dir}
                            error={
                              formik.touched[input.name] &&
                              Boolean(formik.errors[input.name])
                            }
                            errorText={
                              formik.touched[input.name] &&
                              formik.errors[input.name]
                            }
                            helperText={
                              input.helperText &&
                              `${formName}.steps.${activeStep}.fields.${j}.helperText`
                            }
                            options={input.options && input.options}
                            placeholder={
                              input.placeholder &&
                              t(
                                `${formName}.steps.${activeStep}.fields.${j}.placeholder`
                              )
                            }
                            // firstoption={
                            //   firstOption
                            //     ? firstOption
                            //     : {
                            //         key: t(
                            //           `${formName}.steps.${activeStep}.fields.${j}.firstOption`
                            //         ),
                            //         value: "",
                            //       }
                            // }
                            range={input.range && input.range}
                            disabled={
                              input.disabled?.condition
                                ? input.disabled.condition
                                : input.disabled
                            }
                            dimensions={input.dimensions && input.dimensions}
                            ismultiple={input.isMultiple}
                            // getOptionLabel={
                            //   input.options &&
                            //   ((option) => option && option?.key)
                            // }
                            // renderTags={
                            //   input.options &&
                            //   input.renderTags &&
                            //   input.renderTags
                            // }
                            // renderInput={input.options && input.renderInput}
                            // renderOption={input.options && input.renderOption}
                            setfieldvalue={formik.setFieldValue}
                          />
                        </Container>
                      ))}
                      <Box>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRemoveItem(name, i)}
                          disabled={formik.values[name].length === 1}
                        >
                          <ImBin />
                        </Button>
                      </Box>
                    </Box>
                  ))}
              </Box>
            )
        )}
      </Box>

      <Box
        className="inputField"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          disabled={activeStep === 0}
          className="text-color"
          onClick={handleBack}
        >
          {t("back")}
        </Button>
        <Button
          type="submit"
          disabled={isLastStep && formik.isSubmitting}
          variant="contained"
          className="btn"
        >
          {isLastStep
            ? formik.isSubmitting
              ? t(`${formName}.loading`)
              : t(`${formName}.submit`)
            : t("next")}
        </Button>
      </Box>
      {isLastStep && formik.isSubmitting && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "1000",
            // background: "var(--overlay2)",
            // opacity: "0.5",
          }}
        >
          <StandardLoader />
        </Box>
      )}
      {/* {submitPanel && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "1000",
            // background: "var(--overlay2)",
            // opacity: "0.5",
          }}
        >
          {isLastStep && formik.isSubmitting ? (
            <StandardLoader />
          ) : (
            <Box className="response_container">
              {formik.errors ? (
                <FormHelperText>{formik.errors}</FormHelperText>
              ) : (
                "success"
              )}
            </Box>
          )}
        </Box>
      )} */}
    </form>
  );
};

export default MultiStepForm;
