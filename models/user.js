var { mongoose } = require('../db/mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var config = require('../config/config');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    roles: [
        {
            type: String,
            required: true
        }
    ],
});


UserSchema.methods.toJSON = function () {
    var user = this;

    var userObject = user.toObject();

    return _.pick(userObject, ['_id', "email", "username", "status", "roles"])
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;

    var access = 'auth';

    var token = jwt.sign(
        { _id: this._id.toHexString(), username: user.username, access },
        config.secret)
        .toString();

    return token;
}

UserSchema.statics.findByToken = function (token) {
    var decoded;

    try {
        decoded = jwt.verify(token, config.secret);
    } catch (err) {
        console.log("Error in authUser:", err);
        return Promise.reject();
    }

    return this.findOne({
        _id: decoded._id,
        username: decoded.username
    });
}


UserSchema.statics.findByCredentials = function (username, password) {
    var User = this;

    return User.findOne({ username }).then((user) => {
        console.log(user);
        if (!user) {
            console.log("!user");
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    console.log(res);
                    resolve(user);
                } else {
                    reject(err);
                }
            });
        });
    });
};

var User = mongoose.model('User', UserSchema);


module.exports = { User };