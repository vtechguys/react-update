import { SET_USER } from './actions';
export const dispatchUserReducerSetUser = (dispatch) => (user) => dispatch({
    type: SET_USER,
    payload: user,
});