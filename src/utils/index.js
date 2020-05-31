import axios from "axios";
import { BASE_URL } from "../config/api";
const generateUUID = () => {
  const uuid = Math.floor(Math.random() * 1000000000);
  return uuid;
};
axios.defaults.BASE_URL = BASE_URL;
// axios default headers to include token always
export const setAuthToken = (token = null) => {
  if (token) {
    // Apply to every request
    const uuid = axios.defaults.headers.common["x-uuid"] =  generateUUID();
    localStorage.setItem("x-uuid", uuid);
    axios.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("token", token);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["x-uuid"];
    localStorage.removeItem("x-uuid");
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};
