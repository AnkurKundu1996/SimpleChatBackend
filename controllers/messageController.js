const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
const sequelize = require('../config/sequelize');
const db = require('../db/models');
const responseHelper = require("../helpers/responseHelper");
const CustomError = require('../utils/customError');
const Conversation = db.conversations;
const Message = db.messages;

const createMessage = async (req, res) => {
    const transact = await sequelize.transaction();
    try {
        var { thread_id, message } = req.body;
        if (thread_id === "") {
            const { sender_id, receiver_id } = req.body;
            thread_id = uuidv4();

            const { count } = await Conversation.findAndCountAll({
                where: {
                    [Op.and]: [
                        { senderId: sender_id },
                        { receiverId: receiver_id }
                    ]
                }
            });

            if (count > 0) {
                throw new CustomError('Already a thread exists with these users', 403);
            }

            await Conversation.create({
                threadId: thread_id,
                senderId: sender_id,
                receiverId: receiver_id
            }, { transaction: transact });
        }
        await Message.create({
            conversationThread: thread_id,
            messageBody: message
        }, { transaction: transact });

        await transact.commit();
        return responseHelper(res, 'Message Created Successfully', 201)
    } catch (e) {
        await transact.rollback();
        return responseHelper(res, e.message, e.code || 500);
    }
};

const getMessage = async (req, res) => {
    try {
        const user = req.user;
        const toUser = req.query.id;
        const messages = await Message.findAll({
            include: [{
                model: Conversation,
                as: 'conversation',
                where: {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                { senderId: user.id },
                                { receiverId: toUser }
                            ]
                        },
                        {
                            [Op.and]: [
                                { senderId: toUser },
                                { receiverId: user.id }
                            ]
                        }
                    ],
                }
            }],
            order: [
                ['createdAt', 'ASC']
            ]
        })
        const data = { messages }
        return responseHelper(res, 'Messages Fetched Successfully', 200, data)
    } catch (e) {
        console.log(e);
        return responseHelper(res, e.message, e.code || 500);
    }
}

module.exports = {
    createMessage,
    getMessage
}