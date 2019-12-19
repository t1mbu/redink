import { OutlineDS } from "./OutlineDS";

it("tags become closing", () => {
  let o = new OutlineDS("");
  expect(o.opp("<h1>")).toEqual("</h1>");
  expect(o.opp("<h2>")).toEqual("</h2>");
  expect(o.opp("<h3>")).toEqual("</h3>");
  expect(o.opp("<p>")).toEqual("</p>");
});

it("ds basic", () => {
  let o = new OutlineDS(
    "<h2>Animals</h2><h3>Fish</h3><p>Fish are <strong>ectothermic</strong> meaning they're coldblooded.</p><h3>Mammals</h3><p>Mammals are <strong>intelligent</strong>. Many were <strong>domesticated</strong> by humans.</p>"
  );
  expect(o.ds).toEqual([
    ["Animals", 0],
    ["Fish", 1],
    ["ectothermic", 2],
    ["Mammals", 1],
    ["intelligent", 2],
    ["domesticated", 2]
  ]);
});

it("ds basic 2", () => {
  let o = new OutlineDS(
    "<h2>asdf</h2><h3>awef awef</h3><p>asdf <strong>efef</strong></p><h3>asdfawef</h3>"
  );
  expect(o.ds).toEqual([
    ["asdf", 0],
    ["awef awef", 1],
    ["efef", 2],
    ["asdfawef", 1]
  ]);
});
