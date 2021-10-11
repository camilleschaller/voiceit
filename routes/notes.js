var express = require('express');
var notesRouter = express.Router();

/* GET notes listing. */
notesRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST notes creating. */
notesRouter.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT notes modifying. */
notesRouter.put('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE notes deleting. */
notesRouter.delete('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = notesRouter;
