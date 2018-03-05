var getAll = function(req, res) {
    res.send("All products");
}

var getProduct = function(req, res) {
    res.send("single products");
}

var postProduct = function(req, res) {
    res.send("Not implemented: post product");
}

var putProduct = function(req, res) {
    res.send('Not implemented:put product');
}

var deleteProduct = function(req, res) {
    res.send("Not implemented: delete product");
}

module.exports = {
    getAll,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}
