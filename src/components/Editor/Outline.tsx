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
      items.push(Array()); // Unsure of how to initialise array without whining about never/undefined
    }

    for (const [data, level] of ds) {
      console.log(level);
      if (level <= prev + 1) {
        if (level < prev) {
          for (let i = prev; i > level; i--) {
            items[i - 1].push(<List outline={items[i]} />);
            items[i] = [];
          }
        }
        // In order to preserve list order, new bullets are pushed after restructuring of old ones
        items[level].push(<Bullet outline={data} />);
      } else {
        // Can mean that we start out with a strong element but the largest DOM we use is larger.
        items[level].push(<Bullet outline={data} />);
        if (prev === -1) {
          // Make sure items[i - 1] doesn't go to items[-1]
          prev = 0;
        }
        for (let i = level; i > prev; i--) {
          items[i - 1].push(<List outline={items[i]} />);
          items[i] = [];
        }
      }
      prev = level;
    }

    for (let i = o.maxLevel; i > 0; i--) {
      items[i - 1].push(<List outline={items[i]} />); // Don't forget about ending DOM structure
    }

    return (
      <div>
        {items.length && items[0].length ? (
          <List outline={items[0]} />
        ) : (
          <p>No preview available.</p>
        )}
      </div>
    );
  }
}

export default Outline;
