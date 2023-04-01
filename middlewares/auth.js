const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db/models');
const responseHelper = require('../helpers/responseHelper');
const User = db.users;

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            try {
                const { data } = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findByPk(data);
                next();
            } catch {
                return responseHelper(res, 'Unauthorized', 401);
            }
        }
        else {
            return responseHelper(res, 'A token is required for authentication', 403);
        }
    } catch (e) {
        return responseHelper(res, e.message, e.code ??= 500);
    }
}

module.exports = auth;