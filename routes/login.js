var express = require('express');

var _ = require('lodash');
var { User } = require('../models/user');



var router = express.Router();


router.post('/', (req, res) => {

    var body = _.pick(req.body, 'username', 'password');

    User.findByCredentials(body.username, body.password)
        .then((user) => {
            var token = user.generateAuthToken();
            res.header("x-auth", token).send({
                "data": {
                    "token": token,
                    "message": "Token is succesfully created.",
                    "code": 200
                }
            });
        })
        .catch((e) => {
            res.status(403).send();
        })

});

module.exports = router;