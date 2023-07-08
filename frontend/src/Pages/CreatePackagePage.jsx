import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MultiStepForm from "../components/Forms/MultiStepForm";
import { string, object, date, number, array } from "yup";
import { useTranslation } from "react-i18next";
import { useCategoriesContext } from "../contexts/CategoriesContext";
import axios from "axios";
import api_root from "../axios";
// import { useAlertContext } from "../contexts/AlertContext";

const CreatePackagePage = () => {
  const { t } = useTranslation();
  const { tourismCategories } = useCategoriesContext();
  // const { updateState } = useAlertContext();
  // alert(JSON.stringify(tourismCategories));
  // const [tourPackage, setTourPackage] = useState(null);
  // const [panel, setPanel] = useState(false);
  // const [creating, setCreating] = useState(false);
  const formName = "CreateTourPackageForm";

  const tourism_categories = tourismCategories?.map((instance) =>
    Object.assign({ key: instance.title, value: Number(instance.category.id) })
  );
  const steps = [
    {
      label: "Step 1",
      fields: [
        {
          name: "title",
          control: "input",
          type: "text",
          //   label: "First Name",
          placeholder: true,
          required: true,
          autoFocus: true,
        },
        {
          control: "input_list",
          isMultiple: true,
          // required: true,
          name: "tourism_categories",
          placeholder: true,
          // renderTags: (value, getTagProps) =>
          //   value.map((option, index) => (
          //     <Chip
          //       label={option.key}
          //       {...getTagProps({ index })}
          //       sx={{
          //         backgroundColor: "var(--PrimaryColor)",
          //         color: "var(--whiteColor)",
          //         "& .MuiChip-deleteIcon": {
          //           color: "var(--whiteColor)",
          //         },
          //       }}
          //     />
          //   )),
          // renderInput: (params) => (
          //   <TextField
          //     {...params}
          //     sx={{ color: "white", borderRadius: "20px" }}
          //     // name={input.name}
          //     // label={t("EventsFilterForm.filterEvents")}
          //     // placeholder={t("EventsFilterForm.placeholder")}
          //   />
          // ),
          // renderOption: (props, option, { selected }) => {
          //   return (
          //     <li style={{ margin: "0rem 2rem" }} {...props}>
          //       <Checkbox
          //         icon={icon}
          //         checkedIcon={checkedIcon}
          //         style={{ marginRight: 8 }}
          //         checked={selected}
          //       />
          //       {option.key}
          //     </li>
          //   );
          // },
          options: tourism_categories,
        },
      ],
      validationSchema: object({
        title: string().required(t("form.requiredField")),
        tourism_categories: array().of(number().integer().moreThan(0)),
        // .min(
        //   1,
        //   t("form.minLength", {
        //     field: t(`${formName}.steps.0.fields.1.label`),
        //     length: 1,
        //   })
        // )
        // .required(t("form.requiredField")),
      }),
    },
    {
      label: "Step 2",
      fields: [
        {
          name: "startDate",
          control: "input",
          type: "datetime-local",
          required: true,
          // label: "Start Date",
        },
        {
          name: "endDate",
          control: "input",
          type: "datetime-local",
          required: true,
          // label: "End Date",
        },
      ],
      validationSchema: object({
        startDate: date().required(t("form.requiredField")),
        endDate: date()
          .required(t("form.requiredField"))
          .test(
            "endDate",
            t(
              "form.startDateBeforeEndDate",
              t("form.startDateBeforeEndDate", {
                startDate: t(`${formName}.steps.1.fields.0.label`),
                endDate: t(`${formName}.steps.1.fields.1.label`),
              })
            ),
            function (value) {
              if (this) {
                const { startDate } = this.parent;
                // console.log(this.parent);
                return (
                  startDate &&
                  value &&
                  new Date(startDate).getTime() <= new Date(value).getTime()
                );
              }
            }
          ),
      }),
    },
    {
      label: "Step 3",
      fields: [
        {
          name: "budget",
          control: "range",
          // type: "range",
          // label: "Username",
          range: { min: 0, max: 30000 },
          helperText: true,
          autoFocus: true,
          required: true,
        },
      ],
      validationSchema: object({
        budget: number()
          .required(t("form.requiredField"))
          .min(
            "10",
            t("form.minLength", {
              field: t(`${formName}.steps.2.fields.0.label`),
              length: 10,
            })
          )
          .max(
            "10000",
            t("form.maxLength", {
              field: t(`${formName}.steps.2.fields.0.label`),
              length: 10000,
            })
          ),
        //     password: Yup.string().required("Required"),
        //     confirmPassword: Yup.string()
        //       .oneOf([Yup.ref("password"), null], "Passwords must match")
        //       .required("Required"),
      }),
    },
  ];

  const initialValues = {
    title: "",
    tourism_categories: [],
    startDate: null,
    endDate: null,
    budget: 0,
  };
  const submitfunction = async (values, { setSubmitting, setErrors }) => {
    // alert(JSON.stringify(values));
    // console.log(values);
    const cancelToken = axios.CancelToken.source();
    try {
      // setPanel(true);
      // setCreating(true);
      const formData = new FormData();

      // alert(typeof values.endDate);
      formData.append("title", values.title);
      if (values.startDate) {
        formData.append("start_date", values.startDate);
      }
      formData.append("end_date", values.endDate);
      formData.append("budget_target", values.budget);
      formData.append("tourism_categories", values.tourism_categories);

      // alert(JSON.stringify(formData));
      const createPackagePromise = await api_root.apiToken.post(
        "tour_packages/",
        formData,
        { cancelToken: cancelToken.token }
      );

      if (createPackagePromise.status !== 201) {
        throw new Error(createPackagePromise.statusText);
      }

      const createPackageData = createPackagePromise.data;

      // setTourPackage(createPackageData);
      // updateState({
      //   type: "ADD_MESSAGE",
      //   payload: {
      //     text: t("form.createdMessage", {
      //       instance: createPackageData?.title,
      //     }),
      //     status: "success",
      //   },
      // });

      // alert(createPackagePromise.statusText);

      alert(
        t("form.createdMessage", {
          instance: createPackageData?.title,
        })
      );
      setSubmitting(false);
      // setCreating(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("cancelled");
      } else {
        console.error(error);
        // updateState({
        //   type: "ADD_MESSAGE",
        //   payload: {
        //     text: "error",
        //     status: "error",
        //   },
        // });
        setSubmitting(false);

        alert(error);
        setErrors({ submit: error });

        // setCreating(false);
      }
    }

    return () => {
      cancelToken.cancel("cancelled");
    };
  };

  return (
    <Box
      sx={{
        minHeight: `${window.innerHeight - 160}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="title"
        sx={{ color: "var(--PrimaryColor)", fontSize: "36pt" }}
      >
        {t(`${formName}.title`)}
      </Typography>
      <MultiStepForm
        formName={formName}
        initialvalues={initialValues}
        steps={steps}
        submitfunction={submitfunction}
      />
    </Box>
  );
};

export default CreatePackagePage;
