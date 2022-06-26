const JWT = require('jsonwebtoken');
const config  = require('../config');
const constants = require('../utils/const_messages')

const generateAuthToken = (userId) => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            const err = {
                status: 400,
                message: constants.MISSING_USER_ID
            };
            reject(err);
        }
        resolve(JWT.sign({ _id: userId }, config.JWT_SECRET_KEY, { expiresIn: '1h' }));
    });
};

const verifyToken = (token) => {
    return new Promise((resolve) => {
        resolve(JWT.verify(token, config.JWT_SECRET_KEY));
    });
};

module.exports = {
    generateAuthToken,
    verifyToken
}
