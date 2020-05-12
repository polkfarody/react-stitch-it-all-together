import React, {Component} from 'react';
import Home from '../components/HomeComponent';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProjects} from "../store/actions/projects";
import Login from "../components/LoginComponent";
import * as authActions from "../store/actions/auth";
import AuthRoute from "../routes/AuthRoute";
import Index from "../components/IndexComponent";
import FlashMessages from "../components/Alert/FlashMessages";

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProjects: () => dispatch(fetchProjects()),
    logout: () => dispatch(authActions.authManualLogout())
});

class Layout extends Component {
    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    projects={this.props.projects}
                    projectsLoading={this.props.projects.isLoading}
                    projectsError={this.props.projects.error}
                />
            );
        }

        return (
            <div>
                <Header {...this.props} />
                <FlashMessages messages={[]}/>
                        <Switch>
                            <AuthRoute path="/home" component={HomePage} type="stitcher"/>
                            <AuthRoute path='/login' type="guest">
                                <Login />
                            </AuthRoute>
                            <Route to="/" render={Index}/>
                        </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
