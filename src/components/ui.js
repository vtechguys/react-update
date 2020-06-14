import React from "react";
import "./ui.css";
import { useHistory, Link } from "react-router-dom";
import SpinnerGif from "./spinner.gif";
import { styleSpinner, styleAvatar, styleCircle } from "./styles";
export const Spinner = () => {
  return <img src={SpinnerGif} alt="Loading..." style={styleSpinner}/>;
};
export const Avatar = ({ src, alt, name }) => {
  return <img style={styleAvatar} src={src} alt={alt ? alt : name} />;
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
    <div className={"Card column  " + className} onClick={onClick}>
      {children}
    </div>
  );
};
export const Circle = ({className="" }) => {
  return <div className={"circle " + className}></div>
};
const img = 'https://thedailyfandom.com/wp-content/uploads/2014/09/monkey-d-luffy-2-years-later-pictures-4851.jpg'
export const ProfilePic = ({ image = img , link, username }) => {
  return (
    <div className="container-fluid column justify_center align_center">
        <Link to={link}>
        { !image ?
           <div className="ProfileImage cursor_ptr">
           </div>
           : 
           <img src={image} alt={username} className="ProfileImage  cursor_ptr"/>        
        }
        </Link>
    </div>
  );
};
