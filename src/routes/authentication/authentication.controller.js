
const errorHandler = require('../../utils/errors');
const hash = require('../../utils/hashingHelper')
const constants =  require('../../utils/const_messages');
const userService = require('../../db_services/user_services');
const jwt = require('../../utils/JWTUtils');
const helper = require('../../utils/helper');

SignUp = async (req, res) => {
    const data = req.body;
    try {
        const user = await userService.findUserByEmail(data.email)
        
        if(user) {
            throw { status: 409, message: constants.ALREADY_EXISTS('User') };
        }

        const hashedPassword = await hash.hasPassword(data.password);
        const userInstance = helper.prepareUserInstance(data, hashedPassword);
        const createdUser = await userService.saveUser(userInstance);

        if (!createdUser) {
            throw { status: 500, message: constants.SOMETHING_WENT_WRONG };
        }

        const authToken = await jwt.generateAuthToken(createdUser._id);

        return res.status(200).json({
            success: true,
            user: createdUser,
            access_token: authToken,
        });

    } catch(err) {
        return errorHandler(res, err.status || 400, err )
    }

};

Login = async (req, res) => {

    try {
        const user = await userService.findUserByEmail(req.body.email);
        if (!user) {
            throw  { status: 404, message: constants.NOT_EXISTS('user') };
        }

        const isMatch = await hash.comparePassword(req.body.password, user.password);
        if (!isMatch) {
            throw  { status: 403, message: constants.INCORRECT_PASSWORD };
        }
        const authToken = await jwt.generateAuthToken(user._id);

        return res.status(200).json({
            success: true,
            access_token: authToken,
            user,
        });

    } catch(err) {
        return errorHandler(res, err.status || 400, err)
    }
};

module.exports = {
    SignUp,
    Login,
}
