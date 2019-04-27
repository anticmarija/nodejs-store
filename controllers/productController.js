const mongoDBPath = "mongodb://localhost:27017/Store";
const _ = require('lodash');

var MongoClient = require('mongodb');
var getValueForNextSequence = require('../util/util').getValueForNextSequence;

var countProducts = function (req, res) {
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('products')
            .find()
            .count()
            .then((docs) => {
                res.send({ num: docs });
            })

        client.close();
    });
}

var getProducts = function (req, res) {
    var query = _.pick(req.query, "category", "name");

    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('products').find(query)
            .toArray().then((docs) => {
                res.send(docs);
            })

        client.close();
    });
}

var postProduct = function (req, res) {

    var body = _.pick(req.body, ['name', 'description', 'category', 'quantity']);
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        getValueForNextSequence('product_id', function (id) {
            db.collection('product').insertOne({
                "_id": (+id + 1),
                'name': body.name,
                'description': body.description,
                'category': body.category,
                'quantity': body.quantity
            }).then((docs) => {
                res.send({
                    "data": {
                        "message": "Product successfully stored into database."
                    },
                    "resource": docs.ops
                })
            }).catch((e) => {
                res.send(e);
            })
        });

    });

}

var putProduct = function (req, res) {
    var query = _.pick(req.body, ['name', 'description', 'category', 'quantity']);
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('product').findOneAndUpdate({
            _id: parseInt(req.params.id)
        }, {
                $set: {
                    name: query.name,
                    description: query.description,
                    category: query.category,
                    quantity: query.quantity
                }
            }, {
                returnOriginal: false
            }).then((result) => {
                if (result.value === null) {
                    return res.status(400).send();
                }
                res.send({
                    "data": {
                        "message": "Product successfully updated in database."
                    }
                })
            })
            .catch((e) => {
                res.status(400).send();
            })
    });
}

var deleteProduct = function (req, res) {
    var id = req.params.id;
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('product').findOneAndDelete({
            _id: parseInt(id)
        }).then((results) => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).send();
        });
    });
}

module.exports = {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    countProducts
}
