import * as ActionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";


const initialState = {
    token: null,
    isLoading: false,
    errors: null,
    username: null,
    isAuthChecked: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return updateObject(state, {
                isLoading: true,
                errors: null,
                token: null,
                isAuthChecked: false,
            });
        case ActionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                errors: null,
                token: action.token,
                isAuthChecked: true,
            });
        case ActionTypes.AUTH_LOGGED_IN:
            return updateObject(state, {
                isLoading: false,
                errors: null,
                username: action.username,
                isAuthChecked: true,
            });
        case ActionTypes.AUTH_FAIL:
            return updateObject(state, {
                isLoading: false,
                errors: action.errors,
                token: null,
                isAuthChecked: true,
            });
        case ActionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                isLoading: false,
                token: null,
                errors: null,
                isAuthChecked: true,
            });
        default:
            return state
    }
}

export default reducer;
