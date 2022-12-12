const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is Required']
  },
  age: {
    type: Number,
    required: [true, 'Age is Required']
  },
  monthYear: {
    type: [String]
  },
  batch: {
    type: String
  }
});

module.exports = mongoose.model("Person", PersonSchema);
