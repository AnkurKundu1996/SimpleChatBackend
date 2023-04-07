const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const messageCreateValidation = require('../requests/messageCreateValidation');
const validator = require('../middlewares/validator');

router.post('/create', validator(messageCreateValidation), messageController.createMessage);
router.get('/fetch-messages', messageController.getMessage);

module.exports = router;