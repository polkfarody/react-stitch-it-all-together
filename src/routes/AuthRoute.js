import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = props => {
    const { isAuthenticated, type } = props;

    if (type === 'guest' && isAuthenticated) {
        return <Redirect to="/home" />;
    } else if (type === 'stitcher' && !isAuthenticated) {
        return <Redirect to="/" />;
    }

    return <Route {...props} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(AuthRoute);
