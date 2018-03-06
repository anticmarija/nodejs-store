var MongoClient = require('mongodb');
const mongoDBPath = "mongodb://localhost:27017/Store";

function getValueForNextSequence(sequenceOfName, callback) {
    MongoClient.connect(mongoDBPath, function (err, client) {
        if (!err) {
            console.log("We are connected");
        }
        const db = client.db('Store');

        db.collection('counter').findOneAndUpdate(
            {
                "_id": sequenceOfName
            }, {
                $inc: {
                    "sequence_value": 1
                }
            }, {
                returnNewDocument: false
            }
        ).then((doc) => {
            callback(doc.value.sequence_value);
        })
            .catch((e) => {
                console.log(e);
            })
    });
}

module.exports = {
    getValueForNextSequence
}