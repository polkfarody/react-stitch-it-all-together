import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from "./DishdetailComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchDishes, fetchPromos, fetchLeaders} from "../redux/ActionCreators";
import {postComment, fetchComments} from "../redux/creators/CommentCreators";
import {fetchProjects} from "../redux/creators/ProjectCreator";
import {postFeedback} from "../redux/creators/FeedbackCreators";
import {loginUser, logoutUser} from "../redux/creators/AuthCreators";
import {actions} from "react-redux-form";
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        projects: state.projects,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchComments: () => dispatch(fetchComments()),
    fetchProjects: () => dispatch(fetchProjects()),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchProjects();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    projects={this.props.projects.projects[0]}
                    projectsLoading={this.props.projects.isLoading}
                    projectsErrMsg={this.props.projects.errMsg}
                />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <DishDetail
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMsg={this.props.dishes.errMsg}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMsg={this.props.comments.errMsg}
                    postComment={this.props.postComment}
                />
            );
        }

        const PrivateRoute = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: {from: props.location}
                    }}/>
            )}/>
        );

        return (
            <div>
                <Header auth={this.props.auth}
                        loginUser={this.props.loginUser}
                        logoutUser={this.props.logoutUser}
                />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage}/>
                            <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                            <Route path="/menu/:dishId" component={DishWithId}/>
                            <Route exact path="/contactus"
                                   component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                                                             postFeedback={this.props.postFeedback}/>}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        )
            ;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
