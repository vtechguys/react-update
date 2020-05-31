import { SET_USER } from "./actions";
export const dispatchUserReducerSetUser = (dispatch) => (user) => {
  console.log("Next is dispatch", dispatch, user);
  return dispatch({
    type: SET_USER,
    payload: user,
  });
};
