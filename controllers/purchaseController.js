var { Purchase } = require('../models/purchase');
var _ = require('lodash');
var { mongoose } = require('../db/mongoose');



/*http://host:port/store/purchase/?perPage=2&pageNum=1&userName=astro&dateFrom=2017-07-18T07:22Z&dateTo=2017-07-20T07:22Z&productId=5088

Query parameters: 


perPage: int – number of results per page
pageNum: int – current page number 
userName: string
dateFrom: date
dateTo: string
productId: number
*/

var getPurchase = function (req, res) {

    var pageNum = Number(req.query.pageNum) || 1;
    var perPage = Number(req.query.perPage) || 10;
    var query = _.pick(req.query, 'userName', 'productId', 'dateFrom', 'dateTo');

    if (req.user.roles.indexOf("ADMIN") === -1) {
        query.userName = req.user.username;
    }
    let query1 = {};

    if (query.userName) query1.userName = query.userName;
    if (query.productId) query1.productId = query.productId;


    if (query.dateFrom !== undefined || query.dateTo !== undefined) {
        query1.purchaseDate = {}
    }

    if (query.dateFrom) {
        var from = new Date(query.dateFrom).toISOString();
        query1.purchaseDate.$gte = from;
    }

    if (query.dateTo) {
        var to = new Date(query.dateTo).toISOString();
        query1.purchaseDate.$lte = to;
    }

    console.log(query1);

    Purchase.find(query1)
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


/*http://host:port/store/purchase
Request example:
{
    "userName" : "gagi",
    "quantity" : 6,
    "productId" : 5081,
    "purchaseDate" : "2017-02-18T07:22Z"
}

Response example:
{
    "data": {
        "message": "Purchase successfuly made."
    }
}*/

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