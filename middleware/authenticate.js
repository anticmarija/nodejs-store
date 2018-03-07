/**authenticate user */
var {User} = require('../models/user');

function authenticate(req, res, next) {
    var token = req.header('x-auth');

    User.findByToken(token)
    .then((user) => {
        if(!user) {
            res.status(403).send('no user found!');
        }

        console.log(user);
        // res.send(user);

        req.user = user;
        req.token = token;
        next();
    })
    .catch((err) => {
        res.status(403).send();
    })
}

module.exports= {
    authenticate
}