import * as ActionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";


const initialState = {
    token: null,
    isLoading: false,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return updateObject(state, {
                isLoading: true,
            });
        case ActionTypes.AUTH_SUCCESS:
            return updateObject(state, {
                isLoading: false,
                error: null,
                token: action.token
            });
        case ActionTypes.AUTH_FAIL:
            return updateObject(state, {
                isLoading: false,
                error: action.error,
                token: null,
            });
        case ActionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                isLoading: false,
                token: null,
                error: null
            });
        default:
            return state
    }
}

export default reducer;
