import React, {Component} from 'react';
import {Button, FormGroup, Input, Label} from "reactstrap";
import { Control, Form, Errors } from "react-redux-form"
import {NavLink} from "react-router-dom";
import {Loading} from "./LoadingComponent";
import {connect} from 'react-redux';
import {authLogin} from "../store/actions/auth";


const required = (val) => val && val.length;

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(data, event) {
        event.preventDefault();
        this.props.onAuth(data.username, data.password);
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
              <p>{this.props.error}</p>
            );
        }

        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                {errorMessage}
                {
                    this.props.isLoading ?
                        <Loading/>
                        :
                        <Form model="login" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Control.text
                                    model=".username"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{
                                        required: "Required"
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Control.text
                                    model=".password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".password"
                                    show="touched"
                                    messages={{
                                        required: "Required"
                                    }}
                                />
                            </FormGroup>
                            <Button type="submit" value="value" color="primary">Login</Button>

                            <NavLink to={'/signup/'}>
                                Signup
                            </NavLink>
                        </Form>
                }
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        error: state.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
