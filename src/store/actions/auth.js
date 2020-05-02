import * as ActionTypes from './actionTypes'
import axios from 'axios';
import * as HttpStatus from 'http-status-codes'

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

export const authFail = error => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error
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

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/api/login/', {
            username: username,
            password: password,
        })
            .then(response => {
                if (response.status === HttpStatus.OK) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(response => response.data)
            .then(data => {
                const token = data.token;
                const expiryDate = new Date(new Date().getTime() + 3600 * 1000).getTime();
                localStorage.setItem('token', token);
                localStorage.setItem('expiryDate', expiryDate);

                // If login was successful, set the token in local storage
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(error => dispatch(authFail(error)))
    };
};

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/api/register/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
        })
            .then(response => {
                if (response.status === HttpStatus.OK) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(response => response.data)
            .then(data => {
                const token = data.token;
                const expiryDate = new Date(new Date().getTime() + 3600 * 1000).getTime();
                localStorage.setItem('token', token);
                localStorage.setItem('expiryDate', expiryDate);

                // If login was successful, set the token in local storage
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(error => dispatch(authFail(error)))
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
