import {
  SET_USER,
  SET_USER_AUTHENTICATED,
  SEARCH_TYPING,
  FORM_INPUT_CHANGE,
  FORM_INPUT_ERROR,
  FORM_INPUT_ERRORS,
  FORM_INPUT_VALID,
} from "./actions";
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

export function searchTypingReducer(state, { type, payload = [] }) {
  console.log("searchTypingReducer", state, type, payload);
  switch (type) {
    case SEARCH_TYPING: {
      return payload;
    }
    default: {
      return state;
    }
  }
}
export function formReducer(state, { type, payload }) {
  switch (type) {
    case FORM_INPUT_CHANGE: {
      const { name, value } = payload;
      return {
        ...state,
        [name]: {
          ...(state && state[name]),
          value,
          touched: true,
        },
      };
    }
    case FORM_INPUT_ERROR: {
      const { name, error } = payload;
      return {
        ...state,
        [name]: {
          ...(state && state[name]),
          error,
          valid: false,
        },
      };
    }
    case FORM_INPUT_ERRORS: {
      const stateWithErrorsMaped = Object.fromEntries(
        Object.entries(payload)
          .map(([name, error]) => [
            name,
            state[name] ? { ...state[name], error, valid: false } : null,
          ])
          .filter(([_, config]) => config)
      );
      return {
        ...state,
        ...stateWithErrorsMaped,
      };
    }
    case FORM_INPUT_VALID: {
      const { name } = payload;
      return {
        ...state,
        [name]: {
          ...(state && state[name]),
          error: '',
          valid: true,
        },
      };
    }
    default: {
      return state;
    }
  }
}
