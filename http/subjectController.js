const debug = require('debug')('demo:movies');
const subject = require('../models/subjectSchema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createSubject = function (req, res, next) {

    if (req.body.userId && !ObjectId.isValid(req.body.userId)) {
        return res.status(422).send({
            message: 'User validation failed: userId: user not found',
            errors: {
                userId: {
                    message: 'user not found',
                    path: 'userId',
                    value: req.body.userId
                }
            }
        });
    }

    const newSubject = new subject(req.body);
    newSubject.save(function (err, savedSubject) {
        if (err) {
            return next(err);
        }
        debug(`Created subject "${savedSubject.title}"`);

        res
            .status(201)
            //.set('Location', `${config.baseUrl}/api/subjects/${savedSubject._id}`)
            .set('Location', `${'localhost:3000'}/api/subjects/${savedSubject._id}`)
            .send(savedSubject);
    });
}

exports.listSubjects = function (req, res, next) {

    // Count total subjects matching the URL query parameters
    const countQuery = querySubjects(req, req.currentUserId);
    countQuery.count(function (err, total) {

        if (err) {
            return next(err);
        }

        // Prepare the initial database query from the URL query parameters
        let query = querySubjects(req, req.currentUserId);

        // Parse pagination parameters from URL query parameters
        const { page, pageSize } = utils.getPaginationParameters(req);

        // Apply the pagination to the database query
        query = query.skip((page - 1) * pageSize).limit(pageSize);

        // Add the Link header to the response
        utils.addLinkHeader('/api/subjects', page, pageSize, total, res);

        // Populate the directorId if indicated in the "include" URL query parameter
        if (utils.responseShouldInclude(req, 'user')) {
            query = query.populate('userId');
        }

        // Execute the query
        query.sort({ title: 1 }).exec(function (err, notes) {
            if (err) {
                return next(err);
            }
            res.send(notes);
        });
    });
}

exports.modifySubject = function (req, res, next) {
    req.subject.title = req.body.title;
    req.subject.description = req.body.description;

    const subjectModified = req.subject;
    subjectModified.save(function (err, savedSubject) {

        debug(`Updated subject "${savedSubject.title}"`);
        res.send(savedSubject);
    });
}

exports.deleteSubject = function (req, res, next) {
    req.subject.remove(function (err) {

        debug(`Deleted subject "${req.subject.title}"`);
        res.sendStatus(204);
    });
}

exports.loadSubjectsFromParamsMiddleware = function (req, res, next) {
    subject.find(function (err, subjects) {
        if (err) {
            return next(err);
        }

        req.subjects = subjects;
        next();
    });
}

function querySubjects(req, userId) {

    let query = subject.find();
    query = query.where('userId').equals(userId);

    if (!isNaN(req.query.rating)) {
        query = query.where('rating').equals(req.query.rating);
    }
    if (!isNaN(req.query.ratedAtLeast)) {
        query = query.where('rating').gte(req.query.ratedAtLeast);
    }
    if (!isNaN(req.query.ratedAtMost)) {
        query = query.where('rating').lte(req.query.ratedAtMost);
    }ß
    return query;
}