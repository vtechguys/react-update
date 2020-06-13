import React from "react";
import "./ui.css";
export const Spinner = () => {
  return <div className="Loader"></div>;
};
export const Avatar = ({ src, alt, name }) => {
  return <img className="Avatar" src={src} alt={alt ? alt : name} />;
};
export const Input = ({
  onChange = () => {},
  value = "",
  error = "",
  type = "text",
  onBlur = () => {},
  name,
  label,
  disabled = false,
  valid = true,
  required = false
}) => {
  return (
    <div className="Input_Container">
      <label htmlFor={name} className="font-avg">
        {label}
        {required ? <span className="pl8">*</span> : null}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={
          "Input" +
          (error ? " Input_Error" : "") +
          (disabled ? " disabled" : "")
        }
        name={name}
        id={name}
        disabled={disabled}
        required={required}
      />
      {
        error ? 
        <p className="Error font-small">{ error }</p>
        : null

      }
    </div>
  );
};

