import ReactQuill from "react-quill";
import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import OutlineInfo from "./OutlineInfo";
import Button from "react-bootstrap/Button";
import Outline from "./Outline";
import Container from "react-bootstrap/Container";
import TextField from "@material-ui/core/TextField";

interface IState {
  title: string;
  text: string;
}

class Editor extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { title: "", text: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value: string) {
    this.setState({ text: value });
  }

  handleSubmit() {}

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
