var express = require('express');

var router = express.Router();

var categoryCtrl = require('../controllers/categoryController');

router.get('/', categoryCtrl.getCategory);

router.post('/', categoryCtrl.postCategory);

router.delete('/:id', categoryCtrl.deleteCategory);

module.exports = router;