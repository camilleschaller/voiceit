const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
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
        validator: validateSubjectTitleUniqueness,
        message: 'Subject {VALUE} already exists'
      }],
  },
  description: {
    type: String,
    required: false,
    maxlength: 100,
  }
});

/**
 * Given a subject, calls the callback function with true if no subject exists with that title
 * (or the only subject that exists is the same as the subject being validated).
 */
 function validateSubjectTitleUniqueness(value) {
    return this.constructor.findOne().where('title').equals(value).exec().then((existingSubject) => {
      return !existingSubject || existingSubject._id.equals(this._id);
    });
  }

module.exports = mongoose.model('subject', subjectSchema);