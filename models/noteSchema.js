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
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'subject',
    default: null,
    required: true,
    validate: {
      // Validate that the subjectId is a valid subjectId
      // and references an existing person
      validator: validateSubject,
      message: props => props.reason.message
    }
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

/**
 * Given a subject ID, ensures that it references an existing subject.
 *
 * If it's not the case or the ID is missing or not a valid object ID,
 * the "subjectId" property is invalidated.
 */
 function validateSubject(value) {
  if (!ObjectId.isValid(value)) {
    throw new Error('subject not found');
  }

  return mongoose.model('subject').findOne({ _id: ObjectId(value) }).exec().then(subject => {
    if (!subject) {
      throw new Error('subject not found');
    }

    return true;
  });
}  

module.exports = mongoose.model('note', noteSchema);