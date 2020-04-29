import * as ActionTypes from '../ActionTypes'
import { baseUrl } from "../../shared/baseUrl";

export const projectsFailed = (errMsg) => ({
    type: ActionTypes.PROJECTS_FAILED,
    payload: errMsg
});

export const addProjects = (projects) => ({
    type: ActionTypes.ADD_PROJECTS,
    payload: projects.results,
    count: projects.count,
    next: projects.next,
    previous: projects.previous
});

export const fetchProjects = () => (dispatch) => {
    return fetch(baseUrl + 'projects', {
        headers: {
            'Content-Type':'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            let errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(projects => dispatch(addProjects(projects)))
        .catch(error => dispatch(projectsFailed(error.message)));
}
