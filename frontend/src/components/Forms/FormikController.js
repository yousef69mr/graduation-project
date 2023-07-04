import React from "react"

import { CheckBoxes, RadioButtons, SelectInput, TextArea, Input, FilePreview, DatasetInput, RangeInput } from "./Inputs";

const FormikController = (props) => {
    const { control, ...rest } = props
    switch (control) {
        case "input":
            return <Input {...rest} />
        case "textarea":
            return <TextArea {...rest} />
        case "select":
            return <SelectInput {...rest} />
        case "radio":
            return <RadioButtons {...rest} />
        case "checkbox":
            return <CheckBoxes {...rest} />
        case "input_list":
            return <DatasetInput {...rest} />
        case "range":
            return <RangeInput {...rest} />
        case "file":
            return <FilePreview {...rest} />
        default:
            return null
    }
}
export default FormikController;