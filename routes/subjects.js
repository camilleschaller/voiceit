var express = require('express');
var subjectsRouter = express.Router();

/* GET subjects listing. */
subjectsRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST subjects creating. */
subjectsRouter.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT subjects modifying. */
subjectsRouter.put('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE subjects deleting. */
subjectsRouter.delete('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = subjectsRouter;
