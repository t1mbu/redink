var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  title: String,
  text: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", NoteSchema, "notes");