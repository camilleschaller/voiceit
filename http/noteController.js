const debug = require('debug')('demo:note');
const note = require('../models/noteSchema');
const utils = require('../utils.js');
const subject = require('../models/subjectSchema');
const user = require('../models/userSchema');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createNote = function (req, res, next) {

    // BUGFIX: validate ObjectId reference before attempting to save. This is to
    // avoid a Mongoose issue where casting fails before custom validation can be
    // applied: https://github.com/Automattic/mongoose/issues/8300
    if (req.body.subjectId && !ObjectId.isValid(req.body.subjectId)) {
        return res.status(422).send({
            message: 'Subject validation failed: subjectId: subject not found',
            errors: {
                subjectId: {
                    message: 'subject not found',
                    path: 'subjectId',
                    value: req.body.subjectId
                }
            }
        });
    }

    const newNote = new note(req.body);
    newNote.save(function (err, savedNote) {

        debug(`Created note "${savedNote.title}"`);

        res
            .status(201)
            //.set('Location', `${config.baseUrl}/api/notes/${savedNote._id}`)
            .set('Location', `${'localhost:3000'}/api/notes/${savedNote._id}`)
            .send(savedNote);
    });
}

exports.listNotes = function (req, res, next) {

    if (!ObjectId.isValid(req.query.subjectId)) {
        return res.status(422).send({
            message: 'Subject validation failed: subjectId: subject not found',
            errors: {
                subjectId: {
                    message: 'subject not found',
                    path: 'subjectId',
                    value: req.body.subjectId
                }
            }
        });

    }

    subject.findById(req.query.subjectId, function (err, subject) {
        if (err) {
            return next(err);
        } else if (!subject) {
            return userNotFound(res, subject);
        }

        if (req.currentUserId !== subject.userId.toString()) {
            console.log(req.currentUserId);
            console.log(subject.userId);
            return res.status(403).send('Please mind your own things.')
        }

        // Count total notes matching the URL query parameters
        const countQuery = queryNotes(req, subject);
        countQuery.count(function (err, total) {

            if (err) {
                return next(err);
            }


            // Prepare the initial database query from the URL query parameters
            let query = queryNotes(req, subject);

            // Parse pagination parameters from URL query parameters
            const { page, pageSize } = utils.getPaginationParameters(req);

            note.aggregate([
                {
                    $match: {
                        subjectId: ObjectId(req.query.subjectId)
                    }
                },
                {
                    $lookup: {
                        from: 'subjects',
                        localField: '_id',
                        foreignField: 'subjectId',
                        as: 'linkedNotes'
                    }
                },
                {
                    $unwind: {
                        path: '$linkedNotes',
                        // Preserve subjects who have not linked notes
                        // ("linkedNotes" will be null).
                        preserveNullAndEmptyArrays: true
                    }
                },
                // Replace "linkedNotes" by 1 when set, or by 0 when null.
                {
                    $addFields: {
                        linkedNotes: {
                            $cond: {
                                if: '$linkedNotes',
                                then: 1,
                                else: 0
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        linkedNotes: { $sum: '$linkedNotes' },
                        userId: { $first: '$userId' },
                        description: { $first: '$description' },
                        title: { $first: '$title' }
                    }
                },
                {
                    $sort: {
                        title: 1
                    }
                },
                {
                    $skip: (page - 1) * pageSize
                },
                {
                    $limit: pageSize
                }
            ], (err, notes) => {
                if (err) {
                    return next(err);
                }

                utils.addLinkHeader('/api/notes', page, pageSize, total, res);

                res.send(notes.map(dataNote => {

                    // Transform the aggregated object into a Mongoose model.
                    const serialized = new note(dataNote).toJSON();

                    // Add the aggregated property.
                    serialized.linkedNotes = dataNote.linkedNotes;

                    return serialized;
                }));

                // Apply the pagination to the database query
                //query = query.skip((page - 1) * pageSize).limit(pageSize);

                // Add the Link header to the response
                //utils.addLinkHeader('/api/notes', page, pageSize, total, res);

                // Populate the directorId if indicated in the "include" URL query parameter
                //if (utils.responseShouldInclude(req, 'subject')) {
                //  query = query.populate('subjectId');
                //}

                // Execute the query
                //query.sort({ title: 1 }).exec(function (err, notes) {
                //  if (err) {
                //    return next(err);
                //}
                //res.send(notes);
                //});
            });

        })
    })
};

exports.modifyNote = function (req, res, next) {
    req.note.title = req.body.title;
    req.note.text = req.body.text;
    req.note.subject = req.body.subject;

    const noteModified = req.note;
    noteModified.save(function (err, savedNote) {
        if (err) {
            return next(err);
        }
        debug(`Updated note "${savedNote.title}"`);
        res.send(savedNote);
    });
}

exports.deleteNote = function (req, res, next) {
    req.note.remove(function (err) {
        if (err) {
            return next(err);
        }
        debug(`Deleted note "${req.note.title}"`);
        res.sendStatus(204);
    });
}

exports.loadNotesFromParamsMiddleware = function (req, res, next) {
    note.find(function (err, notes) {
        if (err) {
            return next(err);
        }
        req.notes = notes;
        next();
    });
}

/**
* Returns a Mongoose query that will retrieve movies filtered with the URL query parameters.
*/

function queryNotes(req, subject) {

    let query = note.find();
    query = query.where('subjectId').equals(subject._id);

    if (!isNaN(req.query.rating)) {
        query = query.where('rating').equals(req.query.rating);
    }
    if (!isNaN(req.query.ratedAtLeast)) {
        query = query.where('rating').gte(req.query.ratedAtLeast);
    }
    if (!isNaN(req.query.ratedAtMost)) {
        query = query.where('rating').lte(req.query.ratedAtMost);
    }

    return query;
}