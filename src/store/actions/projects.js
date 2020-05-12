import * as ActionTypes from './actionTypes'
import axios from "axios"

export const projectsFailed = (error) => ({
    type: ActionTypes.PROJECTS_FAILED,
    error: error
});

export const addProjects = (projects) => ({
    type: ActionTypes.ADD_PROJECTS,
    payload: projects
});

export const projectCreated = (response) => ({
    type: ActionTypes.PROJECT_CREATED,
    payload: response
});

export const projectsLoading = () => ({
    type: ActionTypes.PROJECTS_LOADING,
});

// Fetch all projects
export const fetchProjects = () => dispatch => {
    dispatch(projectsLoading());
    axios.get('/api/projects/')
        .then(response => {
            return response.data;
        })
        .then(projects => dispatch(addProjects(projects)))
        .catch(error => dispatch(projectsFailed(error)));
};

// Post project
export const createProject = (payload) => dispatch => {
    dispatch(projectsLoading());
    axios.post('/api/projects/', payload)
        .then(response => {
            return response.data;
        })
        .then(data => dispatch(projectCreated(data)))
        .catch(error => dispatch(projectsFailed(error)));
};
