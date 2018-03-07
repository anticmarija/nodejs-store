/*
user routes
*/
var express = require('express');
var router = express.Router();

var {authenticate} = require('../middleware/authenticate');
var {authenticateAdmin} = require('../middleware/authenticateAdmin');

var userCtrl = require('../controllers/userController.js');

router.get('/', authenticate, userCtrl.getUsers);

router.post('/', userCtrl.postUser);

router.put('/:userName', authenticateAdmin, userCtrl.putUser);

router.delete('/:userName', authenticateAdmin, userCtrl.deleteUser);

module.exports = router;