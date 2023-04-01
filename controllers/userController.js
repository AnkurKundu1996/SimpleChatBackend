const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const responseHelper = require('../helpers/responseHelper');
const sequelize = require('../config/sequelize');
const db = require('../db/models');
const User = db.users;

//Handles user signup.
const register = async (req, res) => {
    const transact = await sequelize.transaction();
    try {
        const { first_name, last_name, email, phone_number, password } = req.body;
        let user = await User.create({
            firstName: first_name,
            lastName: last_name,
            email,
            phoneNumber: phone_number,
            password: await bcrypt.hash(password, 8)
        }, { transaction: transact });

        await transact.commit();

        const data = { user };
        return responseHelper(res, 'User Registered Successfully', 201, data)
    } catch (e) {
        await transact.rollback();
        return responseHelper(res, e.message, e.code ??= 500);
    }
}

//Handles user login.
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return responseHelper(res, 'Invalid Credential', 404);
        } else {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return responseHelper(res, 'Invalid Credential', 404);
            } else {
                const token = jwt.sign({
                    data: user.id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });

                const data = {
                    user,
                    accessToken: token
                }
                return responseHelper(res, 'Login Successful', 200, data)
            }
        }
    } catch (e) {
        return responseHelper(res, e.message, e.code ??= 500);
    }
}

//Handles user logout
const logout = async (req, res) => {
    try {
        throw ({
            message: 'Logged Out',
            code: 401
        })
    } catch (e) {
        return responseHelper(res, e.message, e.code ??= 500);
    }
}

module.exports = {
    register,
    login,
    logout
}