var express = require('express');

var router = express.Router();

var productCtrl = require('../controllers/productController');

router.get('/', productCtrl.getProducts);

router.post('/', productCtrl.postProduct);

router.put('/:id', productCtrl.putProduct);

router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;