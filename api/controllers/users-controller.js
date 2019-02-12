const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CONSTANTS = require('../helpers/constants');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    if (!validPassword(req.body.password)) {
        return res.status(422).json({ message: 'Cannot use this password' });
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            res.status(422).json({ message: 'Duplicate email' });
        } else {
            hashPasswordAndRegisterUser(req, res);
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
};

function validPassword(password) {
    if (password.length < 6 || password.length > 32) {
        return false;
    } else {
        return true;
    }
}

function hashPasswordAndRegisterUser(req, res) {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            res.status(500).json({ error: error });
        } else {
            createUser(hash, req, res);
        }
    });
}

function createUser(hash, req, res) {
    const id = new mongoose.Types.ObjectId;
    const user = new User({
        _id: id,
        email: req.body.email,
        password: hash
    });

    User.save(user, res);
}

exports.login = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            comparePasswords(user, req, res);
        } else {
            res.status(401).json({ message: 'Auth failed' });
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
};

function comparePasswords(user, req, res) {
    bcrypt.compare(req.body.password, user.password, (error, authorized) => {
        if (error) {
            res.status(401).json({ message: 'Auth failed' });
        } else if (authorized) {
            returnToken(user, res);
        } else {
            res.status(401).json({ message: 'Auth failed' });
        }
    });
}

function returnToken(user, res) {
    const token = jwt.sign(
        { id: user._id },
        CONSTANTS.JWT_SECRET,
        { expiresIn: CONSTANTS.TOKEN_EXP }
    );

    res.status(200).json({
        token: token
    });
}
