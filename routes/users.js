var express = require('express');
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/getUser', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users creating. */
usersRouter.post('/createUser', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT users modifying. */
usersRouter.put('/modifyUser', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE users deleting. */
usersRouter.delete('/deleteUser', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = usersRouter;
