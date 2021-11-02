const debug = require('debug')('demo:movies');
const note = require('../models/notestSchema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createNote = function (req, res, next) {

        if (err) {
            return next(err);
        }
        const newNote = new note(req.body);
        newNote.save(function (err, savedNote) {
            if (err) {
                return next(err);
            }

            debug(`Created note "${savedNote.title}"`);

            res
                .status(201)
                //.set('Location', `${config.baseUrl}/api/notes/${savedNote._id}`)
                .set('Location', `${'localhost:3000'}/api/notes/${savedNote._id}`)
                .send(savedNote);
        });
}

exports.listNotes = function (req, res, next) {
    res.send(req.note);
}

exports.modifyNote = function (req, res, next) {
    req.note.title = req.body.title;
    req.note.text = req.body.text;
    req.note.subject = re.body.subject;

        if (err) {
            return next(err);
        }
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
    const noteId = req.params.id;
    if (!ObjectId.isValid(noteId)) {
        return noteNotFound(res, noteId);
    }
    note.findById(req.params.id, function (err, note) {
        if (err) {
            return next(err);
        } else if (!note) {
            return noteNotFound(res, noteId);
        }
        req.note = note;
        next();
    });
}

function noteNotFound(res, noteId) {
    return res.status(404).type('text').send(`No note found with ID ${noteId}`);
}