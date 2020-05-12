import * as ActionTypes from "../../store/actions/actionTypes";
import {authLogout} from "../../store/actions/auth";

export const authMiddleware = () => next => action => {
    next(action);
    switch (action.type) {
        case ActionTypes.AUTH_LOGGED_IN:
            window.flash_messages.addMessage({ id: 'loginSuccess', text: 'Welcome, thanks for logging in!', type: 'success' });
            break;
        case ActionTypes.AUTH_LOGGED_OUT:
            next(authLogout());
            window.flash_messages.addMessage({ id: 'logoutSuccess', text: 'See you next time!', type: 'info' });
        default:
            break;
    }
};
