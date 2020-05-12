import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ProjectCards} from "../ProjectList";
import {ComponentLoader} from "../../../components/Loading";
import * as projectActions from "../../../store/actions/projects";
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

class LandingPage extends Component {
    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        return (
            <Container fluid="md">
                <Row>
                    <Col className="text-right">
                        <Link className="btn btn-info" to="/projects/new"  role="button">
                            <span className="fa fa-plus fa-lg"/> Create Project
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ComponentLoader isLoading={this.props.projects.isLoading}>
                            <ProjectCards projects={this.props.projects.projects}/>
                        </ComponentLoader>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: () => dispatch(projectActions.fetchProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
