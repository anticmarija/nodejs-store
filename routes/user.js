/*
user routes
*/
var express = require('express');
var router = express.Router();

var userCtrl = require('../controllers/userController.js');

router.get('/', userCtrl.getUsers);

router.post('/', userCtrl.postUser);

router.put('/:userName', userCtrl.putUser);

router.delete('/:userName', userCtrl.deleteUser);

module.exports = router;