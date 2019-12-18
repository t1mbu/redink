import React, { Component } from "react";
import { OutlineDS } from "./OutlineDS";

interface IProps {
  outline: string;
}

class Bullet extends Component<IProps> {
  render() {
    return <li>{this.props.outline}</li>;
  }
}

class List extends Component<IProps> {
  render() {
    return <ul>{this.props.outline}</ul>;
  }
}

class Outline extends Component<IProps> {
  public render() {
    let o = new OutlineDS(this.props.outline);
    let ds = o.ds;
    let prev = -1;
    let items = Array();
    for (let i = 0; i < 4; i++) {
      items.push([]);
    }

    console.log(ds);
    for (const [data, level] of ds) {
      if (level <= prev + 1) {
        items[level].push(<Bullet outline={data} />);
        if (level < prev) {
          for (let i = prev; prev !== level; i--) {
            items[i - 1].push(<List outline={items[i]} />);
            items[i] = [];
          }
        }
        console.log("Items 1: " + items);
      }
      prev = level;
    }
    console.log("Items 2: " + items);

    return (
      <div>
        {items.length && items[0].length ? (
          <List outline={items[0]} />
        ) : (
          <p>Sorry, no outline available.</p>
        )}
      </div>
    );
  }
}

export default Outline;
