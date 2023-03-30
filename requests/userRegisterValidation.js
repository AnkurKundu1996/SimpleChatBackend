const Joi = require('joi');

const userRegisterValidationSchema = Joi.object({
    first_name: Joi.string().min(2).max(20).required(),
    last_name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().min(10).max(13).required()
}).options({ abortEarly: false });

module.exports = userRegisterValidationSchema;