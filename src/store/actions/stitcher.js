import * as ActionTypes from './actionTypes'
import axios from "axios"

export const stitcherFailed = (error) => ({
    type: ActionTypes.STITCHER_FAILED,
    error: error
});

export const stitcherAdd = (stitcher) => {
    return {
        type: ActionTypes.STITCHER_ADD,
        payload: stitcher
    }
};

export const stitcherLoading = () => ({
    type: ActionTypes.STITCHER_LOADING,
});

export const fetchStitcher = (userId) => {
    return dispatch => {
        dispatch(stitcherLoading());
        axios.get(`/api/stitchers/${userId}/`)
            .then(response => {
                return response.data;
            })
            .then(stitcher => dispatch(stitcherAdd(stitcher)))
            .catch(error => dispatch(stitcherFailed(error)));
    }
}
