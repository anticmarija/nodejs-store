var { Purchase } = require('../models/purchase');
var _ = require('lodash');

var getPurchase = function (req, res) {
    Purchase.find({ username: req.user.username })
        .then((data) => {
            res.json({
                data
            }).send();
        }, (e) => {
            res.status(400).send(e);
        });

}

var postPurchase = function (req, res) {
    var body = _.pick(req.body, ['username', 'purchase']);
    var purchase = new Purchase(req.body);

    purchase.save().then(() => {

        res.json({
            "data": {
                "message": "Purchase successfully made."
            }
        }).send();
    }).catch((e) => {
        res.status(400).send(e);
    });

};

module.exports = {
    getPurchase,
    postPurchase
}