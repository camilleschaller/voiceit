import UserController from "/userController";
var express = require('express');
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users creating. */
usersRouter.post('/', function(req, res, next) {
  res.send(UserController.createUser(req.body));
});

/* PUT users modifying. */
usersRouter.put('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE users deleting. */
usersRouter.delete('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = usersRouter;
