import * as ActionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const defaultState = {
    isLoading: true,
    error: null,
    user: {}
};

const addUser = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        user: action.payload
    })
};

const userLoading = (state, action) => {
    return updateObject(state, {
        isLoading: true,
        error: null,
        user: {}
    })
};

const userFailed = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error,
        user: {}
    })
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.USER_ADD:
            return addUser(state, action);

        case ActionTypes.USER_LOADING:
            return userLoading(state, action);

        case ActionTypes.USER_FAILED:
            return userFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
