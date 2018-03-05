var mongoose = require('mongoose');
var validator = require('validator');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    status: {
        type: String,
        required: true
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
        unique:true
    },
    roles: [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = { User };