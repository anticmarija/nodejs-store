const mongoDBPath = "mongodb://localhost:27017/Store";
const _ = require('lodash');

var MongoClient = require('mongodb');
var getValueForNextSequence = require('../util/util').getValueForNextSequence;

var getCategory = function (req, res) {

    var name = _.pick(req.query, "name");

    console.log(name);
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('category').find(name).toArray()
            .then((docs) => {
                res.send(docs)
            })
            .catch((e) => {
                res.status(400).send(e);
            })

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

        getValueForNextSequence('category_id', function (id) {
            db.collection('category').insertOne({
                "_id": (+id+1),
                'name': body.name,
                'description': body.description
            }).then((cat) => {
                res.send({
                    "data": {
                        "message": "Category successfully stored into database."
                    },
                    "resource": cat.ops
                })
            }).catch((e) => {
                res.send(e);
            })
        });

    })
}

var deleteCategory = function (req, res) {
    var id = req.params.id;
    console.log(id);
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('category').findOneAndDelete({
            _id: parseInt(id)
        }).then((results) => {
            res.status(204).send();
        }).catch((err) => {
            res.status(400).send();
        });
    });
}

module.exports = {
    getCategory,
    postCategory,
    deleteCategory
}