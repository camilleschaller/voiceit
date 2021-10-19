var UserController = require('../http/userController');
const express = require('express');
const usersRouter = express.Router();

//const config = require('../config');

const mongoose =require('mongoose');
const ObjectId =mongoose.Types.ObjectId;
//const utils = require('./utils');

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users creating. */
usersRouter.post('/', UserController.createUser);

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
