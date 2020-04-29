import * as ActionTypes from "./ActionTypes";

const defaultState = {
    isLoading: true,
    errMsg: null,
    projects: []
};

export const Projects = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROJECTS:
            return {...state, isLoading: false, errMsg: null, projects: action.payload};

        case ActionTypes.PROJECTS_LOADING:
            return {...state, isLoading: true, errMsg: null, projects: []};

        case ActionTypes.PROJECTS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, projects: []};

        default:
            return state;
    }
};
