import * as ActionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const defaultState = {
    isLoading: true,
    error: null,
    projects: []
};

const addProjects = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        projects: action.projects
    })
};

const projectsLoading = (state, action) => {
    return updateObject(state, {
        isLoading: true,
        error: null,
        projects: []
    })
};

const projectsFailed = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error,
        projects: []
    })
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROJECTS:
            return addProjects(state, action);

        case ActionTypes.PROJECTS_LOADING:
            return projectsLoading(state, action);

        case ActionTypes.PROJECTS_FAILED:
            return projectsFailed(state, action);
        default:
            return state;
    }
};

export default reducer;
