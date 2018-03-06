var { User } = require('../models/user');
var _ = require('lodash');
var { mongoose } = require('../db/mongoose');

var getUsers = function (req, res) {
    var perPage = req.query.perPage;
    var pageNum = req.query.pageNum;
    var userName = req.query.userName;

    // Get all users with query userName

    if (userName) {
        User.find({ 'username': userName }).then((data) => {
            res.json({
                data
            }).send();
        }, (e) => {
            res.status(400).send(e);
        });
    } else {
        User.find().then((data) => {
            res.json({
                data
            }).send();
        }, (e) => {
            res.status(400).send(e);
        });
    }


};

//NOT IMPLEMENTED AUTH YET!!!!
var postUser = function (req, res) {
    var body = _.pick(req.body, ['email', 'status', 'password', 'username', 'roles']);
    var user = new User(req.body);

    user.save().then(() => {
        // return user.generateAuthToken();

        res.json({
            "data": {
                "message": "User successfully created."
            }
        }).send();
    })
        // .then((token) => {
        //     res.header('x-auth', token).send(user);
        // })
        .catch((e) => {
            res.status(400).send(e);
        });

};

var putUser = function (req, res) {

    var userName = req.params.userName;

    var body = _.pick(req.body, ['email', 'status', 'roles']);

    User.findOneAndUpdate({ "username": userName }, body).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send({
            "data": {
                "message": "User successfuly updated."
            }
        });
    }).catch((e) => {
        res.status(400).send();
    });
};


var deleteUser = function (req, res) {

    var userName = req.params.userName;

    User.findOneAndRemove({ "username": userName }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send({
            "data": {
                "message": "User successfuly deleted."
            }
        });
    }).catch((e) => {
        res.status(400).send();
    });
}

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}
