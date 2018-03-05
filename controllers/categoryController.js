const mongoDBPath = "mongodb://localhost:27017/Store";
const _ = require('lodash');

var MongoClient = require('mongodb');


function getValueForNextSequence(sequenceOfName) {

    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        var sequenceDoc = db.collection('counter').findAndModify({
            query: { _id: sequenceOfName },
            update: { $inc: { sequence_value: 1 } },
            new: true
        });

        return sequenceDoc.sequence_value;
    });
}



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

        ////get id auto increment!!!

        var last;
        db.collection('category').find().toArray().then((docs) => {
            last = parseInt(docs[docs.length - 1]._id) + 1;

            db.collection('category').insertOne({
                "_id": last,
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
        })
            .catch((err) => {
                console.log(err);
            });

    });


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
            _id:parseInt(id)
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