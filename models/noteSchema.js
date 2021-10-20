const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
    unique: true,
    validate:
      // Manually validate uniqueness to send a "pretty" validation error
      // rather than a MongoDB duplicate key error
      [{
        validator: validateNoteTitleUniqueness,
        message: 'Subject {VALUE} already exists'
      }],
  },
  text: {
    type: String,
    required: false,
  }
});

/**
 * Given a note, calls the callback function with true if no note exists with that title
 * (or the only note that exists is the same as the note being validated).
 */
 function validateNoteTitleUniqueness(value) {
    return this.constructor.findOne().where('title').equals(value).exec().then((existingNote) => {
      return !existingNote || existingNote._id.equals(this._id);
    });
  }

module.exports = mongoose.model('note', noteSchema);