import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import Auth from "./reducers/auth";
import Projects from "./reducers/projects";
import User from "./reducers/user";
import Stitcher from "./reducers/stitcher";
import {authMiddleware} from "../middleware/Auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            auth: Auth,
            projects: Projects,
            user: User,
            stitcher: Stitcher,
        }),
        composeEnhancers(
            applyMiddleware(
                thunk, authMiddleware
            )
        )
    );
};
