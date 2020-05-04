import React, {Component} from 'react';
import {Button, Form, InputGroup, Alert} from "react-bootstrap";
import {Formik} from "formik"
import {connect} from 'react-redux';
import {authLogin} from "../store/actions/auth";
import * as yup from 'yup';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values, {
        props = this.props,
        setSubmitting,
        setErrors
    }) {
        props.onAuth(values.email, values.password).then((action) => {
            if (props.isAuthenticated) {
                props.history.push('/');
            } else if (action.errors) {
                setErrors(action.errors)
            }

            setSubmitting(false);
        });
    }

    handleErrors(errors) {
        if (errors.server_error) {
            return (
                <Alert variant="danger">
                    <strong>Something went wrong</strong>
                    <p>Please try again, or come back another time :)</p>
                </Alert>
            );
        }

        if (errors.form_errors) {
            return (
                <Alert variant="danger">
                    <strong>Login Error</strong>
                    <p>Please check all fields and try again</p>
                    <ul>
                        {
                            errors.form_errors.map((error, key) => {
                                return <li key={key}>{error}</li>
                            })
                        }
                    </ul>
                </Alert>
            );
        }
    }

    render() {
        const schema = yup.object({
            email: yup.string().required(),
            password: yup.string().required(),
        });

        let errorMessage = null;
        if (this.props.errors) {
            errorMessage = this.handleErrors(this.props.errors);
        }

        return (
            <div noValidate className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        {errorMessage}
                        <Formik
                            initialValues={{'email': '', 'password': ''}}
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
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="emailPrepend">@</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                    type="text"
                                                    aria-describedby="emailPrepend"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email}
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
        onAuth: (email, password) => dispatch(authLogin(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
