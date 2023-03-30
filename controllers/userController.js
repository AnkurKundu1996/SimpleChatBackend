const responseHelper = require('../helpers/responseHelper');

const register = async (req, res) => {
    try {
        responseHelper(res, 'Error', 500, {
            bod: req.body
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    register
}