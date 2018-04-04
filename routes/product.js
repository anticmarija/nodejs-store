var express = require('express');

var router = express.Router();

var productCtrl = require('../controllers/productController');

var {authenticate} = require('../middleware/authenticate');
var {authenticateAdmin} = require('../middleware/authenticateAdmin');

router.get('/', productCtrl.getProducts);

router.get('/count', productCtrl.countProducts);

router.post('/', authenticateAdmin, productCtrl.postProduct);

router.put('/:id', authenticateAdmin, productCtrl.putProduct);

router.delete('/:id', authenticateAdmin, productCtrl.deleteProduct);

module.exports = router;