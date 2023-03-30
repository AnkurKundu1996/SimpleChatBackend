const responseHelper = (res, message, code, data = {}) => {
    payload = {};
    payload.message = message;
    if (data) {
        payload.data = data;
    }
    return res.status(code).json(payload);
};

module.exports = responseHelper;