import React, { useCallback } from "react";
import { useFormik } from "formik";
import { ImBin } from "react-icons/im";
import { Button, Container, Box, Typography } from "@mui/material";
import FormikController from "./FormikController";
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
    <div className="transpant-card w-100 m-auto white-color mt-2 mb-2">
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" className="text-color">
          {t(`${formName}.title`)}
        </Typography>
        <Box sx={{ margin: 2 }}>
          {inputs.fields.map(
            (
              {
                name,
                label,
                autoFocus,
                type,
                control,
                required,
                options,
                renderOption,
                renderInput,
                firstOption,
                condition,
                helperText,
                fields,
                isList,
                dimensions,
                disabled,
              },
              index
            ) =>
              condition ? (
                formik.values[condition.field] === condition.value && (
                  <Container sx={{ mt: 1, mb: 1 }} key={index}>
                    <FormikController
                      name={name}
                      label={t(`${formName}.inputs.${index}.label`)}
                      control={control}
                      // variant="outlined"
                      autoFocus={autoFocus}
                      type={type}
                      value={formik.values[name]}
                      onChange={
                        control === "select"
                          ? (e, option) =>
                              option && formik.setFieldValue(name, option.value)
                          : formik.handleChange
                      }
                      onBlur={formik.handleBlur}
                      required={required}
                      error={
                        formik.touched[name] && Boolean(formik.errors[name])
                      }
                      errorText={formik.touched[name] && formik.errors[name]}
                      helperText={helperText && helperText}
                      options={options}
                      disabled={
                        disabled && disabled.condition
                          ? disabled.condition
                          : disabled
                      }
                      dimensions={dimensions && dimensions}
                      // firstOption={
                      //   firstOption
                      //     ? firstOption
                      //     : {
                      //         key: t(
                      //           `CreateOrganizationForm.inputs.${index}.firstOption`
                      //         ),
                      //         value: "",
                      //       }
                      // }
                      // getOptionLabel={
                      //   options && ((option) => option && option.key)
                      // }
                      // renderInput={options && renderInput}
                      // renderOption={options && renderOption}
                      setfieldvalue={formik.setFieldValue}
                    />
                  </Container>
                )
              ) : !isList ? (
                <Container sx={{ mt: 1, mb: 1 }} key={index}>
                  <FormikController
                    name={name}
                    label={t(`${formName}.inputs.${index}.label`)}
                    control={control}
                    // variant="outlined"
                    autoFocus={autoFocus}
                    type={type && type}
                    value={formik.values[name]}
                    onChange={
                      control === "select"
                        ? (e, option) =>
                            option && formik.setFieldValue(name, option.value)
                        : // : control === "file"
                          // ? (e) => formik.setFieldValue(name, e.target.files[0])
                          formik.handleChange
                    }
                    onBlur={formik.handleBlur}
                    required={required}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    errorText={formik.touched[name] && formik.errors[name]}
                    helperText={helperText && helperText}
                    options={options}
                    disabled={
                      disabled && disabled.condition
                        ? disabled.condition
                        : disabled
                    }
                    dimensions={dimensions && dimensions}
                    // firstOption={
                    //   firstOption
                    //     ? firstOption
                    //     : {
                    //         key: t(
                    //           `CreateOrganizationForm.inputs.${index}.firstOption`
                    //         ),
                    //         value: "",
                    //       }
                    // }
                    // getOptionLabel={
                    //   options && ((option) => option && option.key)
                    // }
                    // renderInput={options && renderInput}
                    // renderOption={options && renderOption}
                    setfieldvalue={useCallback(formik.setFieldValue)}
                  />
                </Container>
              ) : (
                <Container sx={{ mt: 1, mb: 1 }} key={index}>
                  <Box>
                    <Typography variant="h4" className="text-color">
                      {t(`${formName}.inputs.${index}.title`)}
                    </Typography>
                    <Button
                      className="buttons text-color"
                      onClick={() => handleAddItem(name)}
                    >
                      {t("addLegalDocuments")}
                    </Button>
                  </Box>
                  {formik.values[name].length > 0 &&
                    formik.values[name].map((array, i) => (
                      <Container className="row" padding={3} key={i}>
                        {fields.map((input, j) => (
                          <Container sx={{ mt: 1, mb: 1 }} key={j}>
                            <FormikController
                              name={`${name}[${i}].${input.name}`}
                              index={j}
                              label={t(`${formName}.inputs.${index}.title`)}
                              control={input.control}
                              // variant="outlined"
                              autoFocus={input.autoFocus}
                              type={input.type}
                              value={formik.values[name]}
                              onChange={
                                control === "select"
                                  ? (e, option) =>
                                      option &&
                                      formik.setFieldValue(name, option.value)
                                  : formik.handleChange
                              }
                              onBlur={formik.handleBlur}
                              required={input.required}
                              error={
                                formik.touched[input.name] &&
                                Boolean(formik.errors[input.name])
                              }
                              errorText={
                                formik.touched[input.name] &&
                                formik.errors[input.name]
                              }
                              helperText={input.helperText && input.helperText}
                              options={input.options && input.options}
                              firstOption={
                                firstOption
                                  ? firstOption
                                  : {
                                      key: t(
                                        `${formName}.inputs.${index}.fields.${i}.firstOption`
                                      ),
                                      value: "",
                                    }
                              }
                              disabled={
                                input.disabled && input.disabled.condition
                                  ? input.disabled.condition
                                  : input.disabled
                              }
                              dimensions={input.dimensions && input.dimensions}
                              // getOptionLabel={
                              //   input.options &&
                              //   ((option) => option && option.key)
                              // }
                              // renderInput={input.options && input.renderInput}
                              // renderOption={
                              //   input.options && input.renderOption
                              // }
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
                      </Container>
                    ))}
                </Container>
              )
          )}
        </Box>

        <div className="inputField">
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            className="buttons"
          >
            {t("submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StandardForm;
