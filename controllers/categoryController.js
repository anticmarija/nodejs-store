const mongoDBPath = "mongodb://localhost:27017/Store";
const _ = require('lodash');

var MongoClient = require('mongodb');


var getCategory = function (req, res) {
    var perPage = req.query.perPage;

    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');


        client.close();
    });




}

var postCategory = function (req, res) {
    var body = _.pick(req.body, ['name', 'description']);
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('category').insertOne({
            'name': body.name,
            'description': body.description
        }).then((cat) => {
            res.send(cat);
        }).catch((e) => {
            res.send(e);
        })
        client.close();
    });


}

var deleteCategory = function (req, res) {
    res.send("Not implemented: delete categ");
}

module.exports = {
    getCategory,
    postCategory,
    deleteCategory
}