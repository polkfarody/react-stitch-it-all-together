import React, { Component } from 'react';
import Moment from 'react-moment';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  ModalHeader,
  ModalBody, Label, Button, Modal
} from "reactstrap";
import { Link } from "react-router-dom";
import {Control, Errors, LocalForm} from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.renderDish = this.renderDish.bind(this);
    this.commentForm = this.commentForm.bind(this);
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    this.toggleModal();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  commentForm() {
    return (
        <div className="row">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <div className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                      model=".rating"
                      name="rating"
                      className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 3 characters",
                        maxLength: "Must be 15 characters or less"
                      }}
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="name"
                    className="form-control"
                    rows="12"
                  />
                </div>
                <Button type="submit" value="value" color="primary">Submit</Button>
              </LocalForm>
            </ModalBody>
          </Modal>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil"></span> Submit Comment
          </Button>
        </div>
    )
  }

  renderDish({dish}) {
    if (dish != null) {
      return (
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
      );
    } else {
      return (
          <div></div>
      );
    }
  }

  renderComments({comments}) {
    if (comments != null) {
      return (
          <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
              {comments.map((comment) => {
                return (
                    <li key={comment.id}>
                      <p>{comment.comment}</p>
                      <p>-- {comment.author}, <Moment date={comment.date} format="MMM Do, YYYY"/></p>
                    </li>
                );
              })}
            </ul>
            <this.commentForm />
          </div>
      );
    } else {
      return (
          <div></div>
      );
    }
  }

  render() {
      return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{this.props.dish.name}</h3>
                <hr/>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-5 m-1">
                <this.renderDish dish={this.props.dish}/>
              </div>
              <div className="col-12 col-md-5 m-1">
                <this.renderComments comments={this.props.comments}/>
              </div>
            </div>
          </div>
      );
  }
}

export default DishDetail;
