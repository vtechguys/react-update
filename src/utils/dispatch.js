import { SET_USER, SET_USER_AUTHENTICATED } from "./actions";
import { themes } from "../config/themeAndStyles";
export const dispatchUserReducerSetUser = (dispatch) => (user) => {
  console.log("dispatchUserReducerSetUser", user);
  return dispatch({
    type: SET_USER,
    payload: user,
  });
};
export const dispatchUserReducerSetUserAuth = (dispatch) => (user) => {
  console.log("dispatchUserReducerSetUserAuth", user);
  return dispatch({
    type: SET_USER_AUTHENTICATED,
    payload: user,
  });
};