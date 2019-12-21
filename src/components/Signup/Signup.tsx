import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../Global/axios";

interface IState {
  email: string;
  password: string;
  isTeacher: boolean;
}

class Signup extends Component<{}, IState> {
  state = { email: "", password: "", isTeacher: false };

  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios
      .post("/api/newuser", {
        params: {
          email: this.state.email,
          password: this.state.password,
          isTeacher: this.state.isTeacher
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

          <Form.Group controlId="studentOrTeacher">
            <Form.Check
              type="radio"
              label="Teacher"
              name="formHorizontalRadios"
              id="teacher"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ isTeacher: true });
              }}
            />
            <Form.Check
              type="radio"
              label="Student"
              name="formHorizontalRadios"
              id="student"
              defaultChecked
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ isTeacher: false });
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

export default Signup;
