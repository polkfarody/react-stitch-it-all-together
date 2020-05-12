import React from 'react';
import {Card, Badge, Media, CardColumns} from "react-bootstrap";

const ProjectList = (props) => {
    const cardList = props.projects.map((project, key) => {
        return (
            <Media key={key} className="media-list-item">
                <img
                    width={64}
                    height={64}
                    className="align-self-start mr-3"
                    src="assets/images/sponsors/ava.jpg"
                    alt="Generic placeholder"
                />
                <Media.Body>
                    <h5>{project.title}</h5>
                    <div>
                        <small className="text-left text-muted">
                            <strong>Stitcher:</strong> {project.stitcher.username}
                        </small>

                        <div className="pull-right text-muted">
                            <Badge variant="info">Stitches: {project.max_stitches}</Badge>
                        </div>
                    </div>
                    <p>{project.description}</p>
                </Media.Body>

            </Media>
        )
    });

    return (
        <>
        {cardList}
        </>
    );
}

export const ProjectCards = (props) => {
    const cardList = props.projects.map((project, key) => {
        return (
            <Card key={key}>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Card.Footer>
                    <small className="text-left text-muted">
                        <strong>Stitcher:</strong> {project.stitcher.username}
                    </small>

                    <div className="pull-right text-muted">
                        <Badge variant="info">Stitches: {project.max_stitches}</Badge>
                    </div>
                </Card.Footer>
            </Card>
        )
    });

    return (
        <CardColumns>
            {cardList}
        </CardColumns>
    );
}

export default ProjectList;
