import * as ActionTypes from "../../store/actions/actionTypes";
import {authLogout} from "../../store/actions/auth";
import axios from "axios";

export const authMiddleware = (store) => next => action => {
    next(action);

    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            // Every request from now can be authorized.
            axios.defaults.headers.common['Authorization'] = `Token ${action.token}`;
            break;
        case ActionTypes.AUTH_LOGGED_IN:
            window.flash_messages.addMessage({ id: 'loginSuccess', text: 'Welcome, thanks for logging in!', type: 'success' });
            break;
        case ActionTypes.AUTH_LOGGED_OUT:
            next(authLogout());
            window.flash_messages.addMessage({ id: 'logoutSuccess', text: 'See you next time!', type: 'info' });
            break;
        case ActionTypes.AUTH_LOGOUT:
            delete axios.defaults.headers.common['Authorization'];
            break;
        default:
            break;
    }
};
