const bcrypt = require('bcrypt');
const responseHelper = require('../helpers/responseHelper');
const sequelize = require('../config/sequelize');
const db = require('../db/models');
const User = db.users;

const register = async (req, res) => {
    const { first_name, last_name, email, phone_number, password } = req.body;
    const transact = await sequelize.transaction();
    try {
        var user = await User.create({
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
        return responseHelper(res, e.message, 500);
    }
}

module.exports = {
    register
}