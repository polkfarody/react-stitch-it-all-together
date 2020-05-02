import * as ActionTypes from './actionTypes'
import axios from "axios"
import * as HttpStatus from 'http-status-codes'

export const projectsFailed = (error) => ({
    type: ActionTypes.PROJECTS_FAILED,
    error: error
});

export const addProjects = (projects) => ({
    type: ActionTypes.ADD_PROJECTS,
    payload: projects
});

export const projectsLoading = () => ({
    type: ActionTypes.PROJECTS_LOADING,
})

export const fetchProjects = () => (dispatch) => {
    return dispatch => {
        dispatch(projectsLoading());
        axios('/api/projects')
            .then(response => {
                if (response.status === HttpStatus.OK) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(response => response.data)
            .then(projects => dispatch(addProjects(projects)))
            .catch(error => dispatch(projectsFailed(error)));
    }
}
