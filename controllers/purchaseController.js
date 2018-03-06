var { Purchase } = require('../models/purchase');
var _ = require('lodash');
var { mongoose } = require('../db/mongoose');


var getPurchase = function (req, res) {

    var pageNum = Number(req.query.pageNum) || 1;
    var perPage = Number(req.query.perPage) || 10;
    var query = _.pick(req.query, 'userName', 'productId', 'dateFrom', 'dateTo');
    
    Purchase.find(query)
    .skip(pageNum * perPage - perPage)
    .limit(perPage)
    .then((data) => {
        res.json({
            data
        }).send();
    }, (e) => {
        res.status(400).send(e);
    });

}

var postPurchase = function (req, res) {
    var body = _.pick(req.body, ['purchaseDate', 'username', 'productId', 'quantity']);
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