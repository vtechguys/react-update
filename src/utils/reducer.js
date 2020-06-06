import { SET_USER, SET_USER_AUTHENTICATED, SEARCH_TYPING } from "./actions";
import { userInitState } from "./context";
export function userReducer(state, { type, payload = userInitState }) {
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
        isAuthenticated: true,
      };
    }
    default: {
      return state;
    }
  }
}

export function searchTypingReducer(state, { type, payload = []}) {
  console.log("searchTypingReducer", state, type, payload);
  switch(type) {
    case SEARCH_TYPING: {
      return payload;
    } 
    default: {
      return state;
    }
  }
}
