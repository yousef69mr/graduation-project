import React from "react";
import { useFormik } from "formik";
import { ImBin } from "react-icons/im";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import { Button, Container, Box, Typography } from "@mui/material";
import FormikController from "./FormikController";
import StandardLoader from "../../Helper/Loader";
import { useTranslation } from "react-i18next";

const StandardForm = (props) => {
  const { formName, initialvalues, inputs, submitfunction } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: inputs.validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      // alert(JSON.stringify(values));

      submitfunction(values, { setSubmitting, setErrors });
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
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ width: "100%", margin: "1rem 0rem" }}>
        {inputs?.fields.map(
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
                    onChange={
                      control === "select"
                        ? (e, option) =>
                            formik.setFieldValue(name, option?.value)
                        : formik.handleChange
                    }
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
                  onChange={
                    control === "select"
                      ? (e, option) => formik.setFieldValue(name, option?.value)
                      : formik.handleChange
                  }
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
                  formik.values[name].map((array, i) => (
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
                            onChange={
                              control === "select"
                                ? (e, option) =>
                                    formik.setFieldValue(name, option?.value)
                                : formik.handleChange
                            }
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

      <Box className="inputField">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          variant="contained"
          className="btn"
        >
          {formik.isSubmitting ? t(`${formName}.loading`) : t("submit")}
        </Button>
      </Box>
      {formik.isSubmitting && (
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
    </form>
  );
};

export default StandardForm;
