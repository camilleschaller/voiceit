const debug = require('debug')('demo:movies');
const user = require('../models/userSchema');
const bcrypt = require('bcrypt');

exports.createUser = function(req, res, next) {
    const plainPassword = req.body.password;
  const costFactor = 10;

  bcrypt.hash(plainPassword, costFactor, function(err, hashedPassword) {
    if (err) {
      return next(err);
    }


        const newUser = new user(req.body);
        
        newUser.password = hashedPassword;
        newUser.save(function (err, savedUser) {
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

    });
      
}

function listUser(){
    db.user.find({})
}

function modifyUser(pseudo, password, mail){
    db.user.update({
        "pseudo": pseudo,
        "password": password,
        "mail": mail,
    })
}

function deleteUser(){
    db.user.remove({})
}