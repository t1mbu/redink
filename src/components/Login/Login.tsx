import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../Global/axios";

interface IState {
  email: string;
  password: string;
}

class Login extends Component<{}, IState> {
  state = { email: "", password: "" };

  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios
      .post("/api/authenticate", {
        params: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ email: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ password: e.target.value });
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
