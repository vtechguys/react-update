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
        image: "https://res.cloudinary.com/ajcloud/image/upload/v1584889088/profile-pic-2019.jpg",
        followers: 24,
        following: 10,
      },
    },
    message: "dashboard",
  }).success();
}
export function fetchResultsForTypingInSearchApi() {
  return mockAsyncAction({
    data: {
      searchResults: [
        { label: "user1", id: "abcd1", type: "user" },
        { label: "post1", id: "abcd2", type: "post" },
        { label: "page1", id: "abcd3", type: "page" },
        { label: "user2", id: "abcd3", type: "user" },
        { label: "page2", id: "abcd3", type: "page" },
      ],
    },
    message: "dashboard",
  }).success();
}
export function loginApi({ loginId, password }) {
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
    errors: {
      loginId: "User with this loginId is not found",
    }
  }).barRequest();
}
export function takeLongTimeApi() {
  console.log('Fired a long time taking api')
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
  }, 5000).success();
}