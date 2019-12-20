import React from "react";
import { OutlineDS } from "./OutlineDS";
import renderer from "react-test-renderer";
import Outline from "./Outline";

it("tags become closing", () => {
  let o = new OutlineDS("");
  expect(o.opp("<h1>")).toEqual("</h1>");
  expect(o.opp("<h2>")).toEqual("</h2>");
  expect(o.opp("<h3>")).toEqual("</h3>");
  expect(o.opp("<p>")).toEqual("</p>");
});

it("ds basic and renders", () => {
  let example =
    "<h2>Animals</h2><h3>Fish</h3><p>Fish are <strong>ectothermic</strong> meaning they're coldblooded.</p><h3>Mammals</h3><p>Mammals are <strong>intelligent</strong>. Many were <strong>domesticated</strong> by humans.</p>";

  let o = new OutlineDS(example);
  expect(o.ds).toEqual([
    ["Animals", 0],
    ["Fish", 1],
    ["ectothermic", 2],
    ["Mammals", 1],
    ["intelligent", 2],
    ["domesticated", 2]
  ]);

  const tree = renderer.create(<Outline outline={example}></Outline>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("ds basic 2", () => {
  let example =
    "<h2>asdf</h2><h3>awef awef</h3><p>asdf <strong>efef</strong></p><h3>asdfawef</h3>";
  let o = new OutlineDS(example);
  expect(o.ds).toEqual([
    ["asdf", 0],
    ["awef awef", 1],
    ["efef", 2],
    ["asdfawef", 1]
  ]);

  const tree = renderer.create(<Outline outline={example}></Outline>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("ds basic 3", () => {
  let example = "<h1>asdf</h1><h2>awef awef</h2><h3>efef</h3><h2>asdfawef</h2>";
  let o = new OutlineDS(example);
  expect(o.ds).toEqual([
    ["asdf", 0],
    ["awef awef", 1],
    ["efef", 2],
    ["asdfawef", 1]
  ]);

  const tree = renderer.create(<Outline outline={example}></Outline>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("ds edge 1", () => {
  let example = "<p>Hello <strong>Bob</strong></p><h1>Hellos</h1>";

  let o = new OutlineDS(example);
  expect(o.ds).toEqual([
    ["Bob", 1],
    ["Hellos", 0]
  ]);

  const tree = renderer.create(<Outline outline={example}></Outline>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("ds edge 2", () => {
  let example =
    "<p>Hello <strong>Bob</strong></p><h1>Hellos</h1><h2>Hellos with people</h2>";

  let o = new OutlineDS(example);
  expect(o.ds).toEqual([
    ["Bob", 2],
    ["Hellos", 0],
    ["Hellos with people", 1]
  ]);

  const tree = renderer.create(<Outline outline={example}></Outline>).toJSON();
  expect(tree).toMatchSnapshot();
});
