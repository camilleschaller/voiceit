const debug = require('debug')('demo:movies');
const subject = require('../models/subjectSchema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createSubject = function (req, res, next) {

        if (err) {
            return next(err);
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
    res.send(req.subject);
}

exports.modifySubject = function (req, res, next) {
    req.subject.title = req.body.title;
    req.subject.description = req.body.description;

        if (err) {
            return next(err);
        }
        const subjectModified = req.subject;
        subjectModified.save(function (err, savedSubject) {
            if (err) {
                return next(err);
            }
            debug(`Updated subject "${savedSubject.title}"`);
            res.send(savedSubject);
        });
}

exports.deleteSubject = function (req, res, next) {
    req.subject.remove(function (err) {
        if (err) {
            return next(err);
        }
        debug(`Deleted subject "${req.subject.title}"`);
        res.sendStatus(204);
    });
}

exports.loadSubjectsFromParamsMiddleware = function (req, res, next) {
    const subjectId = req.params.id;
    if (!ObjectId.isValid(subjectId)) {
        return subjectNotFound(res, subjectId);
    }
    subject.findById(req.params.id, function (err, subject) {
        if (err) {
            return next(err);
        } else if (!subject) {
            return subjectNotFound(res, subjectId);
        }
        req.subject = subject;
        next();
    });
}

function subjectNotFound(res, subjectId) {
    return res.status(404).type('text').send(`No subject found with ID ${subjectId}`);
}