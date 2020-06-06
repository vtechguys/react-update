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
  // const urlCheckToken = CHECK_TOKEN + "?token=" + token;
  // return axios.get(urlCheckToken);
}
export function fetchResultsForTypingInSearch() {
  return mockAsyncAction({
    data: {
      searchResults: [
        { label: 'user1', id: 'abcd1', type: 'user' },
        { label: 'post1', id: 'abcd2', type: 'post' },
        { label: 'page1', id: 'abcd3', type: 'page' },
        { label: 'user2', id: 'abcd3', type: 'user' },
        { label: 'page2', id: 'abcd3', type: 'page' },
      ],
    },
    message: "dashboard",
  }).success();
}