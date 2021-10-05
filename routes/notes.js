var express = require('express');
var notesRouter = express.Router();

/* GET notes listing. */
notesRouter.get('/listNote', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST notes creating. */
notesRouter.post('/createNote', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT notes modifying. */
notesRouter.put('/modifyNote', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE notes deleting. */
notesRouter.delete('/deleteNote', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = notesRouter;
