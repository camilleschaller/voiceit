var express = require('express');
var subjectsRouter = express.Router();

/* GET subjects listing. */
subjectsRouter.get('/listSubject', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST subjects creating. */
subjectsRouter.post('/createSubject', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT subjects modifying. */
subjectsRouter.put('/modifySubject', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE subjects deleting. */
subjectsRouter.delete('/deleteSubject', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = subjectsRouter;
