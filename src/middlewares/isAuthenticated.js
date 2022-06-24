const helper = require("../utils/helper");
const error = require("../utils/errors");
const const_messages = require("../utils/const_messages")
const authService = require("../db_services/auth_services")


const isAuthenticated = (req, res, next) => {
    const token = req.headers.auth_token;
    
    if (token !== undefined && token !== null) {
        helper.verifyToken(token)
            .then(user => authService.getUserById(user._id))
            .then((existUser) => {
                if (existUser) {
                    req.user = existUser
                    next();
                }
            }).catch(err => {
                return error.errorHandling(res, 400, err || const_messages.CANNOT_FIND_USER);
        });
    } else {
        return error.errorHandling(res, 403, const_messages.MISSING_TOKEN);
    }
};

module.exports = {
    isAuthenticated
}