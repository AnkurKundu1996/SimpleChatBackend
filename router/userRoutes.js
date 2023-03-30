const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userRegisterValidationSchema = require('../requests/userRegisterValidation');
const validator = require('../middlewares/validator');

//User registration route.
router.post('/register', validator(userRegisterValidationSchema), userController.register);

module.exports = router;