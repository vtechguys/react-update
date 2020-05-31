import axios from "axios";
import { BASE_URL } from "../config/api";

export function configureHttp() {
  // configure axios
  axios.defaults.baseURL = BASE_URL;
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }
  // axios.default.interceptors.response.use(
  //   function (response) {
  //     const { data } = response;
  //     if (!data) {
  //         return null;
  //     }
  //     return data;
  // },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );

}

// axios default headers to include token always
export const setAuthToken = (token = null) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};
