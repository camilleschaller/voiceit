var NotesController = require('../http/noteController');
var express = require('express');
const utils = require('../utils.js');
const mongoose = require('mongoose');
var notesRouter = express.Router();

const ObjectId = mongoose.Types.ObjectId;

/* GET notes listing. */
notesRouter.get('/', utils.authenticate, NotesController.loadNotesFromParamsMiddleware, NotesController.listNotes);

/* POST notes creating. */
notesRouter.post('/', utils.authenticate, NotesController.createNote);

/* PUT notes modifying. */
notesRouter.put('/:id', utils.authenticate, utils.requireJson, NotesController.loadNotesFromParamsMiddleware, NotesController.modifyNote);

/* DELETE notes deleting. */
notesRouter.delete('/:id', utils.authenticate, NotesController.loadNotesFromParamsMiddleware, NotesController.deleteNote);

module.exports = notesRouter;
