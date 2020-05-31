import { SET_USER } from './actions';
export function userReducer(state, { type, payload }) {
    console.log('userReducer',state, type, payload);
    switch(type) {
        case SET_USER: {
            return {
                ...state,
                ...payload,
            };
        }
        default: {
            return state;
        }
    }
};