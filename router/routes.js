const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

//Basic user Register, Login, Logout functionality routes.
router.use(userRoutes);

module.exports = router;