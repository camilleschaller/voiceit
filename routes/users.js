var UserController = require('../http/userController');
const express = require('express');
//const bcrypt = require('bcrypt');
const usersRouter = express.Router();

//const config = require('../config');
const debug = require('debug')('demo:movies');
const mongoose =require('mongoose');
const user = require('../models/userSchema');
const ObjectId =mongoose.Types.ObjectId;
//const utils = require('./utils');

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users creating. */
usersRouter.post('/', function(req, res, next) {
  new user(req.body).save(function (err, savedUser) {
    if (err) {
      return next(err);
    }

    debug(`Created user "${savedUser.pseudo}"`);

    //Vérifier ce code ci dessous. (password, slide 11 de Express autentification)
    res
      .status(201)
      //.set('Location', `${config.baseUrl}/api/users/${savedUser._id}`)
      .set('Location', `${'localhost:3000'}/api/users/${savedUser._id}`)
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

/* POST login users 
usersRouter.post('/login', function(req, res, next) {

  User.findOne({pseudo: req.body.pseudo}).exec(function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.sendStatus(401);
    }

    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      if (err) {
        return next(err);
      } else if (!valid) {
        return res.sendStatus(401);
      }

      const exp = Math.floor(Date.now() / 100) + 7 * 24 * 3600;
      const payload = { sub : user._id.toString(), exp: exp};
      jwt.sign(payload, secretKey, function(err, token) {
        if (err) { return next (err); }
        res.send({ token : token });
      });
    });
  })
});
*/
module.exports = usersRouter;
