var express = require('express');

var router = express.Router();

var purchaseCtrl = require('../controllers/purchaseController');

router.get('/', purchaseCtrl.getPurchase);

router.post('/', purchaseCtrl.postPurchase);


module.exports = router;