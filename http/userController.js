const debug = require('debug')('demo:movies');
const user = require('../models/userSchema');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createUser = function (req, res, next) {
    const plainPassword = req.body.password;
    const costFactor = 10;

    bcrypt.hash(plainPassword, costFactor, function (err, hashedPassword) {
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

exports.listUser = function (req, res, next) {
    res.send(req.user);
}

exports.modifyUser = function (req, res, next) {
    // Update all properties (regardless of whether they are in the request body or not)
    req.user.pseudo = req.body.pseudo;
    req.user.password = req.body.password;
    req.user.mail = req.body.mail;

    const plainPassword = req.body.password;
    const costFactor = 10;

    bcrypt.hash(plainPassword, costFactor, function (err, hashedPassword) {
        if (err) {
            return next(err);
        }
    const userModified = req.user;
    userModified.password = hashedPassword;
    userModified.save(function (err, savedUser) {
        if (err) {
            return next(err);
        }
        debug(`Updated user "${savedUser.pseudo}"`);
        res.send(savedUser);
    });
})
}

exports.deleteUser = function (req, res, next) {
    req.user.remove(function (err) {
        if (err) {
            return next(err);
        }
        debug(`Deleted user "${req.user.pseudo}"`);
        res.sendStatus(204);
    });
}

exports.loadUserFromParamsMiddleware = function (req, res, next) {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return userNotFound(res, userId);
    }
    user.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return userNotFound(res, userId);
        }
        req.user = user;
        next();
    });
}


function userNotFound(res, userId) {
    return res.status(404).type('text').send(`No user found with ID ${userId}`);
}