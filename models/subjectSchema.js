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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    required: true,
    validate: {
      // Validate that the directorId is a valid ObjectId
      // and references an existing person
      validator: validateUser,
      message: props => props.reason.message
    }
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

 /**
 * Given a user ID, ensures that it references an existing user.
 *
 * If it's not the case or the ID is missing or not a valid object ID,
 * the "userId" property is invalidated.
 */
function validateUser(value) {
  if (!ObjectId.isValid(value)) {
    throw new Error('user not found');
  }

  return mongoose.model('User').findOne({ _id: ObjectId(value) }).exec().then(user => {
    if (!user) {
      throw new Error('user not found');
    }

    return true;
  });
}

module.exports = mongoose.model('subject', subjectSchema);