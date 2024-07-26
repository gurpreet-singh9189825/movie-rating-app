import { FC } from "react";
import "./select.css";

interface SelectProps {
  options: {
    value: string;
    text: string;
  }[];
  value: string;
  name: string;
  errors: { [key: string]: string };
  onChange: (event: any) => void;
}

const Select: FC<SelectProps> = ({
  options,
  onChange,
  value,
  name,
  errors,
}) => {
  const optionRendered = options.map((option) => {
    return (
      <option value={option.value} key={option.value}>
        {option.text}
      </option>
    );
  });
  return (
    <div className="flex-child6">
      <select onChange={onChange} value={value} name={name} className="select">
        {optionRendered}
      </select>
      {errors[name] && <div style={{ color: "red" }}>{errors[name]} </div>}
    </div>
  );
};

export default Select;
