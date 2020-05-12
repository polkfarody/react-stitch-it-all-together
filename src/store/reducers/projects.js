import * as ActionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const defaultState = {
    isLoading: false,
    error: null,
    projects: []
};

const addProjects = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        projects: action.payload
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
};

const projectCreated = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        projects: [...state.projects, action.payload],
    })
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROJECTS:
            return addProjects(state, action);

        case ActionTypes.PROJECTS_LOADING:
            return projectsLoading(state, action);

        case ActionTypes.PROJECTS_FAILED:
            return projectsFailed(state, action);

        case ActionTypes.PROJECT_CREATED:
            return projectCreated(state, action);
        default:
            return state;
    }
};

export default reducer;
