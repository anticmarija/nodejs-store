var { User } = require('./../models/user');

var authenticateAdmin = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        if (user.roles.indexOf('ADMIN') !== -1) {
            req.user = user;
            req.token = token;
            next();
        } else {
            return Promise.reject('User is not ADMIN!');
        }

    }).catch((e) => {
        res.status(403).send(e);
    });
};

module.exports = { authenticateAdmin };