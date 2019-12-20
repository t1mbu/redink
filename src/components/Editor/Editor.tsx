import ReactQuill from "react-quill";
import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import OutlineInfo from "./OutlineInfo";
import Button from "react-bootstrap/Button";
import Outline from "./Outline";
import Container from "react-bootstrap/Container";
import TextField from "@material-ui/core/TextField";
import axios from "../Global/axios";

interface IState {
  title: string;
  text: string;
}

class Editor extends Component<{}, IState> {
  state = { title: "", text: "" };

  constructor(props: {}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value: string) {
    this.setState({ text: value });
  }

  handleSubmit() {
    axios
      .post("/api/putnote", {
        params: {
          title: this.state.title,
          text: this.state.text
        }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  public render() {
    return (
      <div>
        <OutlineInfo />
        <br />
        <Container>
          <TextField
            id="outlined-basic"
            label="title"
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          />
          <form onSubmit={this.handleSubmit}>
            <ReactQuill value={this.state.text} onChange={this.handleChange} />
            <Button variant="dark" type="submit" size="sm">
              Submit
            </Button>
          </form>
        </Container>
        <br />
        <Container>
          <Outline outline={this.state.text} />
        </Container>
      </div>
    );
  }
}

export default Editor;
