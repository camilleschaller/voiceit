const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

userSchema.set('toJSON', {
  transform: transformJsonUser
});

function transformJsonUser(doc, json, options) {
 //Remove the hashed password from the generated JSON.
 //delete json.password;
return json;
}

module.exports = mongoose.model('user', userSchema);