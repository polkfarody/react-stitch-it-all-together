import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    /** les Promise **/
    this.props.loginUser({username: this.username.value, password: this.password.value});

    event.preventDefault();
  }

  render() {
    return (
        <>
          <Form onSubmit={this.handleLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" name="username" innerRef={(input) => this.username = input}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" innerRef={(input) => this.password = input}/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}/>
                Remember Me
              </Label>
            </FormGroup>
            <Button type="submit" value="value" color="primary">Login</Button>
          </Form>
        </>
    );
  }
}

export default Login;
