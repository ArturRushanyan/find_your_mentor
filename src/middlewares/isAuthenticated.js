const jwt = require('../utils/JWTUtils');
const errorHandler = require("../utils/errors");
const const_messages = require("../utils/const_messages")
const userService = require("../db_services/user_services")

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.auth_token;
    if (token !== undefined && token !== null) {
        try {
            const payload = await jwt.verifyToken(token)
            const user = await userService.getUserById(payload._id)
            if (user) {
                req.user = user
                next();
            }

        } catch(err) {
            return errorHandler(res, 400, err || { message: const_messages.CANNOT_FIND_USER });
        }
    } else {
        return errorHandler(res, 403, { message: const_messages.MISSING_TOKEN});
    }
};

module.exports = {
    isAuthenticated
}
