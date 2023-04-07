const db = require('../db/models');
const responseHelper = require('../helpers/responseHelper');
const Conversation = db.conversations;

const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.findAll();
        const data = { conversations };
        return responseHelper(res, 'Conversations fetched successfully', 201, data)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getConversations
}