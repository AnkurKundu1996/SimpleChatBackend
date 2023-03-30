const responseHelper = require("../helpers/responseHelper")

/**
 * Request validation middleware.
 * ValidationSchema is the name of the file in requests folder.
 */
const validator = (validatorSchema) => {
    return async function (req, res, next) {
        try {
            const { error } = validatorSchema.validate(req.body);
            if (error) {
                const validationError = [];
                error.details.forEach(element => {
                    validationError.push({
                        key: element.context.key == element.context.label ? element.context.key : element.context.label,
                        message: element.message,
                    })
                });
                return responseHelper(res, 'Validation Error', 422, validationError)
            }
            next();
        } catch (e) {
            console.log(e)
            return responseHelper(res, e.message, 500);
        }
    }
}

module.exports = validator;