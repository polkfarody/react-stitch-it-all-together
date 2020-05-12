import React from 'react';
import {Card, Jumbotron} from "react-bootstrap";

const Home = (props) => {
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
