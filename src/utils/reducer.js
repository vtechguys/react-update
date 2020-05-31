import { SET_USER, SET_USER_AUTHENTICATED } from "./actions";

export function userReducer(state, { type, payload }) {
  console.log("userReducer", state, type, payload);
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        ...payload,
      };
    }
    case SET_USER_AUTHENTICATED: {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
}
