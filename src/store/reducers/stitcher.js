import * as ActionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const defaultState = {
    isLoading: true,
    error: null,
    stitcher: {}
};

const addStitcher = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        stitcher: action.payload
    })
};

const stitcherLoading = (state, action) => {
    return updateObject(state, {
        isLoading: true,
        error: null,
        stitcher: {}
    })
};

const stitcherFailed = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error,
        stitcher: {}
    })
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.STITCHER_ADD:
            return addStitcher(state, action);

        case ActionTypes.STITCHER_LOADING:
            return stitcherLoading(state, action);

        case ActionTypes.STITCHER_FAILED:
            return stitcherFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
