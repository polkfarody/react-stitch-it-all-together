import React, {Component} from 'react';
import Home from '../components/HomeComponent';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import {Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "../components/LoginComponent";
import * as authActions from "../store/actions/auth";
import AuthRoute from "../routes/AuthRoute";
import Index from "../components/IndexComponent";
import FlashMessages from "../components/Alert/FlashMessages";
import LandingPage from "../domain/Project/LandingPage";
import CreateProjectForm from "../domain/Project/CreateProject"

const mapStateToProps = state => {
    return {
        user: state.user,
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(authActions.authManualLogout())
});

class Layout extends Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
                <FlashMessages messages={[]}/>
                <Switch>
                    <AuthRoute path="/home" type="stitcher" component={Home}/>
                    <AuthRoute exact path="/projects" type="stitcher">
                        <LandingPage/>
                    </AuthRoute>
                    <AuthRoute path="/projects/new" type="stitcher">
                        <CreateProjectForm/>
                    </AuthRoute>
                    <AuthRoute path='/login' type="guest">
                        <Login/>
                    </AuthRoute>
                    <AuthRoute path="/" type="guest" component={Index}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
