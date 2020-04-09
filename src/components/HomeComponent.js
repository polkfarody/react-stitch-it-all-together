import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Jumbotron} from "reactstrap";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";
import {FadeTransform} from 'react-animation-components';

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
        <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translate(-50%)'}}>
          <Card>
            <CardImg src={baseUrl + item.image} alt={item.name}/>
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
              <CardText>{item.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
    );
  }
}

const Home = (props) => {
  return (
      <div>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Northern Beaches Music Festival (Online)</h1>
                <p>We take inspiration from the World's best cuisine, and create a unique fusion experience. Our
                  lipsmacking creations will tickle your culinary senses!</p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <div className="container">
          <div className="row align-items-start">
            <div className="col-12 col-md m-1">
              <RenderCard item={props.dish} isLoading={props.dishesLoading} errMsg={props.dishesErrMsg}/>
            </div>
            <div className="col-12 col-md m-1">
              <RenderCard item={props.promotion} isLoading={props.promosLoading} errMsg={props.promosErrMsg}/>
            </div>
            <div className="col-12 col-md m-1">
              <RenderCard item={props.leader} isLoading={props.leadersLoading} errMsg={props.leadersErrMsg}/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;