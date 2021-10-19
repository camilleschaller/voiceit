var SubjectController = require('../http/subjectController');
var express = require('express');
const utils = require('../utils.js');
const mongoose = require('mongoose');
var subjectsRouter = express.Router();

const ObjectId = mongoose.Types.ObjectId;

/* GET subjects listing. */
subjectsRouter.get('/:id', SubjectController.loadSubjectsFromParamsMiddleware, SubjectController.listSubjects);

/* POST subjects creating. */
subjectsRouter.post('/', SubjectController.createSubject);

/* PUT subjects modifying. */
subjectsRouter.put('/:id', utils.requireJson, SubjectController.loadSubjectsFromParamsMiddleware, SubjectController.modifySubject);

/* DELETE subjects deleting. */
subjectsRouter.delete('/:id', SubjectController.loadSubjectsFromParamsMiddleware, SubjectController.deleteSubject);

module.exports = subjectsRouter;
