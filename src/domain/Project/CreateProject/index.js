import React, {Component} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {Formik} from "formik"
import {connect} from 'react-redux';
import * as yup from 'yup';
import {ServerError, ErrorList} from "../../../components/Error";
import {MainLoader} from "../../../components/Loading";
import {createProject} from "../../../store/actions/projects";

class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values, {
        props = this.props
    }) {
        props.createProject(values);
    }

    handleErrors(errors) {
        if (errors.server_error) {
            return <ServerError/>
        }

        if (errors.form_errors) {
            return <ErrorList title="Error" errors={errors.form_errors}/>
        }


    }

    render() {
        const schema = yup.object({
            title: yup.string().required(),
            description: yup.string().required(),
            type: yup.number().required(),
            max_stitches: yup
                .number()
                .max(10, 'Please start with max 10')
                .min(1, 'At least 1 stitch is required')
                .required(),
            is_private:  yup.bool(),
        });

        let errorMessage = null;
        if (this.props.errors) {
            errorMessage = this.handleErrors(this.props.errors);
        }

        if (this.props.isLoading) {
            return <MainLoader text="Creating Project..."/>
        }

        return (
            <Container fluid="md">
                <Row>
                    <Col>
                        {errorMessage}
                        <Formik
                            initialValues={{
                                'title': '',
                                'description': '',
                                type: 1,
                                max_stitches: 3,
                                is_private: 1,
                            }}
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
                                        <Form.Group controlId="formTitle">
                                            <Form.Label>Title</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    onChange={handleChange}
                                                    value={values.title}
                                                    isInvalid={touched.title && !!errors.title}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.title}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    as="textarea"
                                                    rows="3"
                                                    name="description"
                                                    onChange={handleChange}
                                                    value={values.description}
                                                    isInvalid={touched.description && !!errors.description}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.description}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="formType">
                                            <Form.Label>Type</Form.Label>
                                            <InputGroup>
                                                <Form.Control as="select"
                                                              name="type"
                                                              onChange={handleChange}
                                                              value={values.type}
                                                              isInvalid={touched.type && !!errors.type}>
                                                    <option value="1">Music</option>
                                                    <option value="2">Lyrics</option>
                                                    <option value="3">Joke</option>
                                                    <option value="4">Story</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.type}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="formMaxStitches">
                                            <Form.Label>Number of stitches</Form.Label>
                                            <InputGroup>
                                                <Form.Control type="number"
                                                              name="max_stitches"
                                                              onChange={handleChange}
                                                              value={values.max_stitches}
                                                              isInvalid={touched.max_stitches && !!errors.max_stitches}/>
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.max_stitches}
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
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.projects.isLoading,
        errors: state.projects.errors,
        stitcher: state.stitcher.stitcher
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createProject: (payload) => dispatch(createProject(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
