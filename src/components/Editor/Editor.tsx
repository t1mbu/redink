import ReactQuill from "react-quill";
import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import OutlineInfo from "./OutlineInfo";

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
    console.log(this.state.text);
  }

  public render() {
    return (
      <div>
        <OutlineInfo />
        <ReactQuill value={this.state.text} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Editor;
