import React, { Component } from 'react';
import Layout from './containers/LayoutComponent';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from './store/actions/auth';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup()
    }

    render() {
    return (
          <BrowserRouter>
            <div>
              <Layout {...this.props}/>
            </div>
          </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authActions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
