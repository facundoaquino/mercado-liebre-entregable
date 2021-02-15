// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const userController = require('../controllers/usersController');

router.get('/register', userController.register); 

module.exports = router;
