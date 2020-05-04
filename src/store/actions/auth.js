import * as ActionTypes from './actionTypes'
import axios from 'axios';
import {formatErrorsFromApi} from '../utility';

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = errors => {
    return {
        type: ActionTypes.AUTH_FAIL,
        errors: errors
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');

    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expiryTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiryTime * 1000);
    }
}

const handleAuthSuccess = (data, dispatch) => {
    const token = data.key;
    const expiryDate = new Date(new Date().getTime() + 3600 * 1000).toString();
    localStorage.setItem('token', token);
    localStorage.setItem('expiryDate', expiryDate);

    // If login was successful, set the token in local storage
    dispatch(authSuccess(token));
    dispatch(checkAuthTimeout(3600));
}

const handleAuthError = (error, dispatch) => {
    return dispatch(authFail(formatErrorsFromApi(error)));
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        return axios.post('/api/auth/login/', {
            email: username,
            password: password,
        })
            .then(response => handleAuthSuccess(response.data, dispatch))
            .catch((error) => handleAuthError(error, dispatch))
    };
};

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/api/auth/register/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
        })
            .then(response => handleAuthSuccess(response.data, dispatch))
            .catch((error) => handleAuthError(error, dispatch))
    };
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(authLogout());
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'));
            if (expiryDate <= new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
}
