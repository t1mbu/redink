var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  salt: String,
  pass: String,
  isTeacher: Boolean
});

module.exports = mongoose.model("User", UserSchema, "users");