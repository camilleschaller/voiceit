const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true,
    validate:
      // Manually validate uniqueness to send a "pretty" validation error
      // rather than a MongoDB duplicate key error
      [{
        validator: validateUserPseudoUniqueness,
        message: 'User {VALUE} already exists'
      }],
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
  }
});

userSchema.set('toJSON', {
  transform: transformJsonUser
});

/**
 * Given a pseudo, calls the callback function with true if no user exists with that name
 * (or the only user that exists is the same as the user being validated).
 */
function validateUserPseudoUniqueness(value) {
  return this.constructor.findOne().where('pseudo').equals(value).exec().then((existingUser) => {
    return !existingUser || existingUser._id.equals(this._id);
  });
}

function transformJsonUser(doc, json, options) {
  //Remove the hashed password from the generated JSON.
  //delete json.password;
  return json;
}

module.exports = mongoose.model('user', userSchema);