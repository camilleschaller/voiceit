var UserController = require('../http/userController');
const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();

const config = require('../config');
const debug = require('debug')('demo:movies');
const express =require('express');
const mongoose =require('mongoose');
const user = require('../models/userSchema');
const ObjectId =mongoose.Types.ObjectId;
const utils = require('./utils');

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users creating. */
usersRouter.post('/', function(req, res, next) {
  new User(req.body).save(function (err, savedUser) {
    if (err) {
      return next(err);
    }

    debug(`Created user "${savedUser.pseudo}"`);

    //Vérifier ce code ci dessous. (password, slide 11 de Express autentification)
    res
      .status(201)
      .set('Location', `${config.baseUrl}/api/users/${savedUser._id}`)
      .send(savedUser);
  });  

  
  //res.send(UserController.createUser(req.body));
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
