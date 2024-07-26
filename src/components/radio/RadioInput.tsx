import { FC } from "react";
import "./radio.css";

interface RadioProps {
  onChange: (event: any) => void;
  options: {
    label: string;
    type: string;
    name: string;
    htmlFor: string;
    id: string;
    value: string;
    key: number;
  }[];
  formData: { [key: string]: string };
  checked?: boolean;
  errors: { [key: string]: string };
  fieldsetName: string;
}

const RadioInput: FC<RadioProps> = ({
  options,
  onChange,
  formData,
  errors,
  fieldsetName,
}) => {
  return (
    <>
      <fieldset name={fieldsetName} className="flex-child5">
        {options.map((option) => (
          <div key={option.key} className="flex-child">
            <label htmlFor={option.htmlFor} className="radio-label">
              {option.label}
            </label>
            <input
              type={option.type}
              name={fieldsetName}
              value={option.value}
              id={option.id}
              onChange={onChange}
              className="radio"
              checked={formData[fieldsetName] === option.value}
            />
          </div>
        ))}
        {errors[fieldsetName] && (
          <div style={{ color: "red" }}>{errors[fieldsetName]}</div>
        )}
      </fieldset>
    </>
  );
};

// <div className="flex-child">
//   <label htmlFor={htmlFor} className="radio-label">
//     {label}
//   </label>
//   <input
//     type={type}
//     name={name}
//     value={value}
//     id={id}
//     checked={checked}
//     onChange={onChange}
//     className="radio"
//   />
// </div>

export default RadioInput;
