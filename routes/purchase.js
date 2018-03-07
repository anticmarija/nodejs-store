var express = require('express');

var router = express.Router();

var {authenticate} = require('../middleware/authenticate');
var {authenticateAdmin} = require('../middleware/authenticateAdmin');


var purchaseCtrl = require('../controllers/purchaseController');

router.get('/', authenticateAdmin, purchaseCtrl.getPurchase);

router.post('/', authenticate, purchaseCtrl.postPurchase);


module.exports = router;