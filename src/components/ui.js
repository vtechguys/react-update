import React from "react";
import "./ui.css";
export const Spinner = () => {
  return <div className="Loader"></div>;
};
export const Avatar = ({ src, alt, name }) => {
    return <img className="avatar" src={src} alt={alt ? alt : name}/>
};
