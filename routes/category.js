var express = require('express');

var router = express.Router();

var categoryCtrl = require('../controllers/categoryController');
var {authenticate} = require('../middleware/authenticate');
var {authenticateAdmin} = require('../middleware/authenticateAdmin');

router.get('/', categoryCtrl.getCategory);

router.post('/', authenticateAdmin, categoryCtrl.postCategory);

router.delete('/:id', authenticateAdmin, categoryCtrl.deleteCategory);

module.exports = router;