var {
  user,
  pass
} = require("./secret");
var mongoose = require("mongoose");
var Note = require("./models/notes");
var User = require("./models/users");
var crypto = require("crypto");

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
  var entry = new Note({
    title: a,
    text: b
  });
  entry.save(err => {
    if (err) {
      res.send(err);
    }
  });
  res.send(`Created note with title ${a} and text ${b}`);
});

var getHash = (salt, plain) => {
  return crypto.pbkdf2Sync(plain, salt, 50000, 64, "sha256").toString("hex");
};

router.post("/newuser", (req, res) => {
  var a = req.body.params.email,
    b = req.body.params.password,
    c = req.body.params.isTeacher;
  var newSalt = crypto.randomBytes(20).toString("hex");
  var entry = new User({
    email: a,
    salt: newSalt,
    pass: getHash(newSalt, b),
    isTeacher: c
  });
  entry.save(err => {
    if (err) {
      res.send(err);
    }
  });
  res.send(`Created user with email ${a}, and isTeacher ${c}`);
});