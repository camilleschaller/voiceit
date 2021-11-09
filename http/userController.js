const debug = require('debug')('demo:user');
const user = require('../models/userSchema');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
const { broadcastMessage } = require('../messaging');

exports.createUser = function (req, res, next) {
    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, config.bcryptCostFactor, function (err, hashedPassword) {
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

            res
                .status(201)
                //.set('Location', `${config.baseUrl}/api/users/${savedUser._id}`)
                .set('Location', `${'localhost:3000'}/api/users/${savedUser._id}`)
                .send(savedUser);

            broadcastMessage(`Un.e nouvel.le utilisateur.trice nommé.e ${savedUser.pseudo} nous a rejoint.`);
        });
    });
}

exports.listUser = function (req, res, next) {
    res.send(req.user);
}

exports.modifyUser = function (req, res, next) {
    req.user.pseudo = req.body.pseudo;
    req.user.password = req.body.password;
    req.user.mail = req.body.mail;

    const plainPassword = req.body.password;

    bcrypt.hash(plainPassword, config.bcryptCostFactor, function (err, hashedPassword) {
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

exports.login = function (req, res, next) {
    user.findOne({ pseudo: req.body.pseudo }).exec(function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.sendStatus(401);
        }
        bcrypt.compare(req.body.password, user.password, function (err, valid) {
            if (err) {
                return next(err);
            } else if (!valid) {
                return res.sendStatus(401);
            }
            const exp = Math.floor(Date.now() / 100) + 7 * 24 * 3600;
            const payload = { sub: user._id.toString(), exp: exp };
            jwt.sign(payload, config.secretKey, function (err, token) {
                if (err) { return next(err); }
                res.send({ token: token });
            });
        });
    })
}