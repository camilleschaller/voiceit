var SubjectController = require('../http/subjectController');
var express = require('express');
const utils = require('../utils.js');
const mongoose = require('mongoose');
var subjectsRouter = express.Router();

const ObjectId = mongoose.Types.ObjectId;

/* GET subjects listing. */
subjectsRouter.get('/', utils.authenticate, SubjectController.loadSubjectsFromParamsMiddleware, SubjectController.listSubjects);

/* POST subjects creating. */
subjectsRouter.post('/', utils.authenticate, SubjectController.createSubject);

/* PUT subjects modifying. */
subjectsRouter.put('/:id', utils.authenticate, utils.requireJson, SubjectController.loadSubjectsFromParamsMiddleware, SubjectController.modifySubject);

/* DELETE subjects deleting. */
subjectsRouter.delete('/:id', utils.authenticate, SubjectController.loadSubjectsFromParamsMiddleware, SubjectController.deleteSubject);

module.exports = subjectsRouter;
