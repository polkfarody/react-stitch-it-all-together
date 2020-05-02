import React, {Component} from 'react';
import Home from '../components/HomeComponent';
import Header from '../components/HeaderComponent';
import Footer from '../components/FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProjects} from "../store/actions/projects";
import Login from "../components/LoginComponent";

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProjects: () => dispatch(fetchProjects())
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
                        <Switch>
                            <Route path="/home" component={HomePage}/>
                            <Route exact path='/login/' component={Login} />
                            <Redirect to="/home"/>
                        </Switch>
                <Footer/>
            </div>
        )
            ;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
