const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//User registration route.
router.post('/register', userController.register);

module.exports = router;