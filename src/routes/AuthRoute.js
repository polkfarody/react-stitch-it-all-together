import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import {ComponentLoader} from "../components/Loading";

const AuthRoute = props => {
    const route = getRoute(props);

    return (
        <ComponentLoader isLoading={props.isLoading}>
            {route}
        </ComponentLoader>
    )
};

const getRoute = props => {
    const { isAuthenticated, type, } = props;
    if (type === 'guest' && isAuthenticated) {
        return <Redirect to="/home" />;
    } else if (type === 'stitcher' && !isAuthenticated) {
        return <Redirect to="/" />;
    }

    return <Route {...props} />;
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.token !== null,
    isLoading: state.auth.isAuthChecked === false,
});

export default connect(mapStateToProps)(AuthRoute);
