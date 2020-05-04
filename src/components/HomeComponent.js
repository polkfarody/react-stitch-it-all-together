import React from 'react';
import {Card, Jumbotron} from "react-bootstrap";
import {Loading} from "./LoadingComponent";

function RenderCard({item, isLoading, errMsg}) {
    if (isLoading) {
        return (
            <Loading/>
        );
    } else if (errMsg) {
        return (
            <h4>{errMsg}</h4>
        );
    } else {
        return (
            <Card>
                {/*<CardImg src={baseUrl + item.image} alt={item.name}/>*/}
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle>{item.typeName}</Card.Subtitle>
                    <Card.Text>{item.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

const Home = (props) => {
    const menu = props.projects.projects.map((project) => {
        return (
            <div key={project.id} className="col-12 col-md-5 m-1">
                <RenderCard item={project} isLoading={props.projectsLoading}
                            error={props.projectsError}/>
            </div>
        );
    });
    return (
        <div>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Stitch It All Together</h1>
                            <p>Sell it to me baby!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
