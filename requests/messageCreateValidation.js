const Joi = require('joi');

const messageCreateValidation = Joi.object({
    thread_id: Joi.string().allow("").required(),
    message: Joi.string().required(),
    sender_id: Joi.when('thread_id', { is: "", then: Joi.number().min(1).integer().required().options({ convert: false }) }),
    receiver_id: Joi.when('thread_id', { is: "", then: Joi.number().min(1).integer().required().options({ convert: false }) })
}).options({ abortEarly: false });

module.exports = messageCreateValidation;