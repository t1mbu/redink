var { user, pass } = require("./secret");
var mongoose = require("mongoose");
var Note = require("./models");

var conn = `mongodb+srv://${user}:${pass}@cluster0-pny6m.mongodb.net/test?retryWrites=true&w=majority`;
const port = 5000;

mongoose.connect(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var check = mongoose.connection;
check.on("error", () => console.log("Connection error. Is IP whitelisted?"));
check.once("open", () => console.log("Connection successful"));

var express = require("express");
var cors = require("cors");
var router = express.Router();

const app = express();
app.use(cors());
app.use("/api", router);
router.use(express.json());
app.listen(port, () => {
  console.log("Server runs on port %d", port);
});

router.post("/putnote", (req, res) => {
  var a = req.body.params.title,
    b = req.body.params.text;
  console.log(`Created note with title ${a} and text ${b}`);
  var entry = new Note({
    title: a,
    text: b
  });
  entry.save(err => {
    if (err) {
      res.send(err);
    }
  });
});
