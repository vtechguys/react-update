import axios from "axios";
import { CHECK_TOKEN } from "../config/api";
import { responseType } from "../config/constant";

function mockAsyncAction(
  { data, errors, message = "Async action" },
  delay = 1000
) {
  const asyncFn = (code) => (resolve, reject) =>
    setTimeout(() => {
      if (code === responseType.SUCCESS) {
        return resolve({
          data,
          code,
          message,
        });
      }
      return resolve({
        code,
        errors,
        message,
      });
    }, delay);
  const pr = (fn) => new Promise(fn);
  const success = () => pr(asyncFn(responseType.SUCCESS));
  const barRequest = () => pr(asyncFn(responseType.BAD_REQUEST));
  const serverError = () => pr(asyncFn(responseType.SERVER_ERROR));
  const unauthorized = () => pr(asyncFn(responseType.UNAUTHORIZED));
  return {
    success,
    barRequest,
    serverError,
    unauthorized,
  };
}
export function checkTokenApi(token) {
  if (!token) {
    return Promise.reject();
  }
  if (process.env.NODE_ENV !== "prod") {
    return mockAsyncAction({
      data: {
        user: {
          email: "aniketjha898@gmail.com",
          username: "aniketjha898",
          userId: "quoquoi1310989011",
          isAuthenticated: false,
        },
      },
      message: "dashboard",
    }).success();
  }
  const urlCheckToken = CHECK_TOKEN + "?token=" + token;
  return axios.get(urlCheckToken);
}
