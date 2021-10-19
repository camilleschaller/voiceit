var UserController = require('../http/userController');
const express = require('express');
const utils = require('../utils.js');
const mongoose = require('mongoose');

const usersRouter = express.Router();

const ObjectId = mongoose.Types.ObjectId;

/* GET users listing. */
usersRouter.get('/:id', UserController.loadUserFromParamsMiddleware, UserController.listUser);

/* POST users creating. */
usersRouter.post('/', UserController.createUser);

/* PUT users modifying. */
usersRouter.put('/:id', utils.requireJson, UserController.loadUserFromParamsMiddleware, UserController.modifyUser);

/* DELETE users deleting. */
usersRouter.delete('/:id', UserController.loadUserFromParamsMiddleware, UserController.deleteUser);

/* POST login users */
usersRouter.post('/login', UserController.login);

module.exports = usersRouter;