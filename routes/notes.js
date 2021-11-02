var NotesController = require('../http/notesController');
var express = require('express');
const utils = require('../utils.js');
const mongoose = require('mongoose');
var notesRouter = express.Router();

const ObjectId = mongoose.Types.ObjectId;

/* GET notes listing. */
notesRouter.get('/:id', NotesController.loadNotesFromParamsMiddleware, NotesController.listNotes);

/* POST notes creating. */
notesRouter.post('/', NotesController.createNote);

/* PUT notes modifying. */
notesRouter.put('/:id', utils.requireJson, NotesController.loadNotesFromParamsMiddleware, NotesController.modifyNote);

/* DELETE notes deleting. */
notesRouter.delete('/:id', NotesController.loadNotesFromParamsMiddleware, NotesController.deleteNote);

module.exports = notesRouter;
