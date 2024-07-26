import { FC } from "react";
import "./input.css";

interface InputProps {
  label?: string;
  type: string;
  name?: string;
  htmlFor?: string;
  id?: string;
  value: string;
  placeholder: string | undefined;
  error?: string;
  className?: string;

  onChange: (event: any) => void;
}

const Input: FC<InputProps> = ({
  label,
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  error,
  className,
}) => {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input
        name={name}
        id={id}
        type={type}
        className="input"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
export default Input;
