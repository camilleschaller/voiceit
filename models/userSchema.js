const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const user = new Schema({
  pseudo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  }
});