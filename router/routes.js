const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const conversationRoutes = require('./conversationRoutes');
const messageRoutes = require('./messageRoutes');
const auth = require('../middlewares/auth');

//These routes performs all actions in userController.js
router.use(userRoutes);

//These routes performs all actions in conversationController.js
router.use('/conversation', auth, conversationRoutes);

//These routes performs all actions in messageController.js
router.use('/message', auth, messageRoutes);

module.exports = router;