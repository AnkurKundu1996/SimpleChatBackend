const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userRegisterValidationSchema = require('../requests/userRegisterValidation');
const userLoginValidationSchema = require('../requests/userLoginValidation');
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');

//User registration route.
router.post('/register', validator(userRegisterValidationSchema), userController.register);

//User login route
router.post('/login', validator(userLoginValidationSchema), userController.login);

//User logout route.
router.get('/logout', auth, userController.logout);

module.exports = router;