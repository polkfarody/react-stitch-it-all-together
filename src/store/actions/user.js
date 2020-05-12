import * as ActionTypes from './actionTypes'
import axios from "axios"
import {fetchStitcher} from "./stitcher";

export const userFailed = (error) => ({
    type: ActionTypes.USER_FAILED,
    error: error
});

export const userAdd = (user) => {

    return {
        type: ActionTypes.USER_ADD,
        payload: user
    }
};

export const userLoading = () => ({
    type: ActionTypes.USER_LOADING,
});

export const fetchLoggedInUser = () => {
    return dispatch => {
        dispatch(userLoading());
        axios.get('/api/auth/user/')
            .then(response => {
                return response.data;
            })
            .then(user => {
                dispatch(userAdd(user))
                dispatch(fetchStitcher(user.pk));
            })
            .catch(error => dispatch(userFailed(error)));
    }
}
