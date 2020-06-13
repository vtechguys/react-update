import { SET_USER, SET_USER_AUTHENTICATED, SEARCH_TYPING, FORM_INPUT_CHANGE, FORM_INPUT_ERROR,  FORM_INPUT_ERRORS, FORM_INPUT_VALID } from "./actions";
export const dispatchUserReducerSetUser = (dispatch) => (user) => {
  return dispatch({
    type: SET_USER,
    payload: user,
  });
};
export const dispatchUserReducerSetUserAuth = (dispatch) => (user) => {
  return dispatch({
    type: SET_USER_AUTHENTICATED,
    payload: user,
  });
};
export const dispatchSearchReducerWhileTyping = (dispatch) => (results = []) => {
  return dispatch({
    type: SEARCH_TYPING,
    payload: results
  });
};
export const dispatchFormInputChange = (dispatch) => ({ name = '', value = '' }) => {
  return dispatch({
    type: FORM_INPUT_CHANGE,
    payload: {
      name, 
      value,
    }
  });
};
export const dispatchFormInputError = (dispatch) => ({ name = '', error = ''}) => {
  return dispatch({
    type: FORM_INPUT_ERROR,
    payload: {
      name,
      error,
    }
  });
};
export const dispatchFormInputValid = (dispatch) => ({ name = ''}) => {
  return dispatch({
    type: FORM_INPUT_VALID,
    payload: {
      name,
    }
  });
};
export const dispatchFormInputErrors = (dispatch) => (errors) => {
  return dispatch({
    type: FORM_INPUT_ERRORS,
    payload: errors
  });
};