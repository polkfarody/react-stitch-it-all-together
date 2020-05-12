import React, {Component} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {Formik} from "formik"
import {connect} from 'react-redux';
import {authLogin} from "../store/actions/auth";
import * as yup from 'yup';
import {ServerError, ErrorList} from "../components/Error";
import {MainLoader} from "./Loading";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values, {
        props = this.props
    }) {
        props.onAuth(values.username, values.password);
    }

    handleErrors(errors) {
        if (errors.server_error) {
            return <ServerError/>
        }

        if (errors.form_errors) {
            return <ErrorList title="Login Error" errors={errors.form_errors}/>
        }


    }

    render() {
        const schema = yup.object({
            username: yup.string().required(),
            password: yup.string().required(),
        });

        let errorMessage = null;
        if (this.props.errors) {
            errorMessage = this.handleErrors(this.props.errors);
        }

        if (this.props.isLoading) {
            return <MainLoader text="Signing In..."/>
        }

        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        {errorMessage}
                        <Formik
                            initialValues={{'username': '', 'password': ''}}
                            validationSchema={schema}
                            onSubmit={this.handleSubmit}

                        >
                            {({
                                  handleSubmit,
                                  handleChange,
                                  values,
                                  errors,
                                  touched,
                              }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group controlId="formUsername">
                                            <Form.Label>Username</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="usernamePrepend">
                                                        <span className="fa fa-user"/>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="text"
                                                    aria-describedby="usernamePrepend"
                                                    name="username"
                                                    onChange={handleChange}
                                                    value={values.username}
                                                    isInvalid={touched.username && !!errors.username}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.username}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="passwordPrepend">
                                                        <span className='fa fa-lock'/>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="password"
                                                    aria-describedby="passwordPrepend"
                                                    name="password"
                                                    onChange={handleChange}
                                                    isInvalid={touched.password && !!errors.password}
                                                    value={values.password}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Button variant="primary" type="submit" disabled={this.props.isLoading}>
                                            Submit
                                        </Button>
                                    </Form.Row>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        errors: state.auth.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, setErrors) => dispatch(authLogin(username, password, setErrors))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
