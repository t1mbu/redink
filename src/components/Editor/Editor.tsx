import ReactQuill from "react-quill";
import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import OutlineInfo from "./OutlineInfo";
import Button from "react-bootstrap/Button";
import Outline from "./Outline";

interface IState {
  text: string;
}

class Editor extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { text: "" };
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
        <form onSubmit={this.handleSubmit}>
          <ReactQuill value={this.state.text} onChange={this.handleChange} />
          <Button variant="dark" type="submit" size="sm">
            Submit
          </Button>
        </form>
        <Outline outline={this.state.text} />
      </div>
    );
  }
}

export default Editor;
