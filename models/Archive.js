var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArchiveSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  }
});


var Archive = mongoose.model("Archive", ArchiveSchema);

module.exports = Archive;