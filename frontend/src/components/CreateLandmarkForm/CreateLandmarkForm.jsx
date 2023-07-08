import React from "react";
import { string, date, array, number, mixed, object, ref, bool } from "yup";
import { useCategoriesContext } from "../../contexts/CategoriesContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import api_root from "../../axios";
import MultiStepForm from "../Forms/MultiStepForm";
import { useGovernorateContext } from "../../contexts/GovernorateContext";

const CreateLandmarkForm = () => {
  const { t } = useTranslation();
  const { tourismCategories, typeCategories, ticketClassCategories } =
    useCategoriesContext();
  const { governorates } = useGovernorateContext();
  // const { updateState } = useAlertContext();
  // alert(JSON.stringify(tourismCategories));
  // const [tourPackage, setTourPackage] = useState(null);
  // const [panel, setPanel] = useState(false);
  // const [creating, setCreating] = useState(false);
  const formName = "CreateLandmarkForm";

  const tourism_categories = tourismCategories?.map((instance) =>
    Object.assign({
      key: instance.title,
      value: Number(instance?.category?.id),
    })
  );

  const governoratesOptions = governorates?.map((instance) =>
    Object.assign({
      key: instance.title,
      value: Number(instance?.governorate?.id),
    })
  );

  const type_categories = typeCategories?.map((instance) =>
    Object.assign({
      key: instance.title,
      value: Number(instance?.category?.id),
    })
  );

  const ticket_class_categories = ticketClassCategories?.map((instance) =>
    Object.assign({
      key: instance.title,
      value: Number(instance?.category?.id),
    })
  );

  const eraOptions = t("ERA", { returnObjects: true });
  const steps = [
    {
      label: "Step 1",
      fields: [
        {
          name: "landmark_title",
          control: "input",
          type: "text",
          //   label: "First Name",
          placeholder: true,
          required: true,
          autoFocus: true,
        },
        {
          name: "image",
          control: "file",
          //   label: "First Name",
          dimensions: { height: 100, width: 500 },
          required: true,
        },
        {
          name: "address",
          control: "textarea",
          //   label: "First Name",
          placeholder: true,
          required: true,
        },

        {
          name: "govObject",
          control: "select",
          //   label: "First Name",
          options: governoratesOptions,
          //   placeholder: true,
          placeholder: true,
          required: true,
        },
        {
          control: "input_list",
          isMultiple: true,
          required: true,
          name: "tourism_categories",
          placeholder: true,

          options: tourism_categories,
        },

        {
          name: "description",
          control: "textarea",
          //   label: "First Name",
          placeholder: true,
          required: true,
        },
        {
          name: "location_link",
          control: "input",
          type: "url",
          //   label: "First Name",
          placeholder: true,
          required: true,
          helperText: true,
        },
        {
          name: "typeCategoryObject",
          control: "select",
          options: type_categories,
          placeholder: true,
          required: true,
        },
      ],
      validationSchema: object({
        landmark_title: string().required(t("form.requiredField")),
        image: mixed()
          .required(t("form.requiredField"))
          .test("fileType", t("form.invalidFileType"), function (value) {
            // if (!value) return true; // allow empty value
            return [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/gif",
              "image/bmp",
              "image/webp",
              "image/svg+xml",
            ].includes(value.type);
          }),
        address: string().required(t("form.requiredField")),
        govObject: number().required(t("form.requiredField")),
        tourism_categories: array()
          .of(number().integer().moreThan(0))
          .min(
            1,
            t("form.minLength", {
              field: t(`${formName}.steps.0.fields.4.label`),
              length: 1,
            })
          )
          .required(t("form.requiredField")),
        description: string()
          .required(t("form.requiredField"))
          .min(
            50,
            t("form.minLength", {
              field: t(`${formName}.steps.0.fields.4.label`),
              length: 50,
            })
          ),
        location_link: string()
          .required(t("form.requiredField"))
          .url(t("form.urlField"))
          .matches(
            /^(https?:\/\/)?www\.google\.com\/maps\/embed(.*)$/,
            t("form.InvalidEmbededLink")
          ),
        typeCategoryObject: number().required(t("form.requiredField")),
      }),
    },
    {
      label: "Step 2",
      fields: [
        {
          name: "founder",
          control: "input",
          type: "text",
          //   label: "First Name",
          placeholder: true,
          // required: true,
          autoFocus: true,
        },
        {
          name: "foundationDate",
          control: "input",
          type: "date",
          // required: true,
        },
        {
          name: "foundationDateEra",
          control: "select",
          options: eraOptions,
          placeholder: true,
          // required: true,
        },
        {
          name: "height",
          control: "input",
          type: "number",
          placeholder: true,
          helperText: true,
          // required: true,
        },
        {
          name: "area",
          control: "input",
          type: "number",
          placeholder: true,
          helperText: true,
        },
      ],
      validationSchema: object({
        founder: string().max(
          100,
          t("form.maxLength", {
            field: t(`${formName}.steps.1.fields.0.label`),
            length: 100,
          })
        ),
        foundationDateEra: string().required(t("form.requiredField")),
        foundationDate: date().max(
          new Date(),
          t("form.startDateBeforeEndDate", {
            startDate: t(`${formName}.steps.1.fields.2.label`),
            endDate: t("today"),
          })
        ),

        height: number().nullable().positive().integer().moreThan(0),
        area: number().nullable().positive().integer().moreThan(0),
      }),
    },
    {
      label: "Step 3",
      fields: [
        {
          name: "event_title",
          control: "input",
          type: "text",
          //   label: "First Name",
          placeholder: true,
          required: true,
          autoFocus: true,
        },
        {
          name: "openTime",
          control: "input",
          type: "time",
          required: true,
        },
        {
          name: "closeTime",
          control: "input",
          type: "time",
          required: true,
        },
        // {
        //   name: "isMain",
        //   control: "checkbox",
        //   required: true,
        //   disabled: true,
        // },
        // {
        //   name: "isEternel",
        //   control: "checkbox",
        //   required: true,
        //   disabled: true,
        // },
        // {
        //   name: "startDate",
        //   control: "input",
        //   type: "datetime-local",
        //   required: true,
        //   // label: "Start Date",
        // },
        // {
        //   name: "endDate",
        //   control: "input",
        //   type: "datetime-local",
        //   required: true,
        //   // label: "End Date",
        // },
      ],
      validationSchema: object({
        event_title: string().required(t("form.requiredField")),
        openTime: string().required(t("form.requiredField")),
        // .test("is-time", "Invalid time", (value) => {
        //   // Check if the input value is a valid time
        //   const date = new Date(`2000-01-01T${value}`);
        //   alert(date.getTime(),date.toTimeString(),date.toLocaleTimeString());
        //   return (
        //     !isNaN(date.getTime()) &&
        //     date.toTimeString().includes(date.toLocaleTimeString())
        //   );
        closeTime: string().required(t("form.requiredField")),
        // .test("is-time", "Invalid time", (value) => {
        //   // Check if the input value is a valid time
        //   const date = new Date(`2000-01-01T${value}`);

        //   return (
        //     !isNaN(date.getTime()) &&
        //     date.toTimeString().includes(date.toLocaleTimeString())
        //   );
        // })
        // .test(
        //   "is-after-open-time",
        //   "Close time should be after open time",
        //   function (value) {
        //     // Check if the close time is after the open time
        //     const openTime = this.parent.openTime;
        //     if (!openTime || !value) {
        //       // Skip validation if either open time or close time is missing
        //       return true;
        //     }
        //     const openDate = new Date(`2000-01-01T${openTime}`);
        //     const closeDate = new Date(`2000-01-01T${value}`);
        //     return closeDate.getTime() > openDate.getTime();
        //   }
        // ),
        isMain: bool().required(t("form.requiredField")),
        isEternel: bool().required(t("form.requiredField")),
        // startDate: date().required(t("form.requiredField")),
        // endDate: date()
        //   .required(t("form.requiredField"))
        //   .test("endDate", t("form.startDateBeforeEndDate"), function (value) {
        //     if (this) {
        //       const { startDate } = this.parent;
        //       // console.log(this.parent);
        //       return (
        //         startDate &&
        //         value &&
        //         new Date(startDate).getTime() <= new Date(value).getTime()
        //       );
        //     }
        //   }),
      }),
    },
    {
      label: "Step 4",
      fields: [
        {
          name: "tickets",
          isList: true,
          // type: "range",
          // label: "Username",
          fields: [
            {
              name: "ticket_title",
              control: "input",
              type: "text",
              //   label: "First Name",
              placeholder: true,
              required: true,
              // autoFocus: true,
            },
            {
              name: "price",
              control: "input",
              type: "number",
              //   label: "First Name",
              placeholder: true,
              required: true,
              autoFocus: true,
            },
            {
              name: "ticket_class_category",
              control: "select",
              options: ticket_class_categories,
              //   label: "First Name",
              placeholder: true,
              required: true,
            },
          ],
          range: { min: 1, max: ticket_class_categories?.length },
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
    landmark_title: "",
    image: null,
    address: "",
    govObject: "",
    tourism_categories: [],
    description: "",
    location_link: "",
    typeCategoryObject: "",

    foundationDate: "",
    foundationDateEra: "AD",
    founder: "",
    height: "",
    area: "",

    event_title: "",
    openTime: "",
    closeTime: "",
    isMain: true,
    isEternel: true,
    startDate: "",
    endDate: "",

    tickets: [{ ticket_title: "", price: null, ticket_class_category: null }],
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
    <MultiStepForm
      formName={formName}
      initialvalues={initialValues}
      steps={steps}
      submitfunction={submitfunction}
    />
  );
};

export default CreateLandmarkForm;
