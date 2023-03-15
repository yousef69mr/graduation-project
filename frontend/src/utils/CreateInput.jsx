import FormInput from "../components/FormInput/FormInput";
import FormSelect from "../components/FormSelect/FormSelect";
import { t } from "i18next";
const createField = (
  input,
  index,
  onChangeFunction,
  onBlurFunction,
  value,
  data
) => {
  if (input.tag === "input") {
    return (
      <FormInput
        type={input.type}
        name={input.name}
        value={value}
        onChange={onChangeFunction}
        placeholder={t(`signupform.inputs.${index}.placeholder`)}
        label={t(`signupform.inputs.${index}.label`)}
        pattern={input.pattern}
        errorMessage={t(`signupform.inputs.${index}.errorMessage`)}
        required={input.required}
        list={input.list}
        dataList={data[input.name]}
        onBlur={() => onBlurFunction(input.name)}
        key={input.id}
      />
    );
  } else if (input.tag === "select") {
    return (
      <FormSelect
        name={input.name}
        value={value}
        onChange={onChangeFunction}
        placeholder={t(`signupform.inputs.${index}.label`)}
        label={t(`signupform.inputs.${index}.label`)}
        pattern={input.pattern}
        errorMessage={t(`signupform.inputs.${index}.errorMessage`)}
        required={true}
        header={t(`signupform.inputs.${index}.header`)}
        options={data[input.name]}
        key={input.id}
      />
    );
  } else {
    alert("not implemented yet !!");
  }
};

export default createField;
