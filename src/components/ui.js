import React from "react";
import "./ui.css";
import { useHistory } from "react-router-dom";
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
export const Card = ({ children = (<></>) , path, className = ""}) => {
  const history = useHistory();
  const onClick = () => {
    if (path) {
      return history.push(path);
    }
  };
  return (
    <div className={"column Card" + className} onClick={onClick}>
      {children}
    </div>
  );
};
export const ProfileCardPlaceholder = () => {
  return (
    <Card className="container-fluid ProfilePlaceholder">
        <div className="container-fluid ProfileImage"></div>
        <div className="container-fluid ProfileContainer">
          <div></div>
          <div></div>
        </div>
    </Card>
  );
};
