const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userRegisterValidationSchema = require('../requests/userRegisterValidation');
const userLoginValidationSchema = require('../requests/userLoginValidation');
const validator = require('../middlewares/validator');

//User registration route.
router.post('/register', validator(userRegisterValidationSchema), userController.register);

//User login route
router.post('/login', validator(userLoginValidationSchema), userController.login);


module.exports = router;