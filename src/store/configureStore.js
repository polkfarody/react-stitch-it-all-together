import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {createForms} from "react-redux-form";
import thunk from "redux-thunk";
import Auth from "./reducers/auth";
import Projects from "./reducers/projects";
import {LoginForm, RegistrationForm} from "./forms";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            auth: Auth,
            projects: Projects,
            ...createForms({
                login: LoginForm,
                register: RegistrationForm
            })
        }),
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
};
