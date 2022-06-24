
// Error
const Error = require('../../utils/errors');

// helpers
const helper = require('../../utils/helper')
const constants =  require('../../utils/const_messages');

// Services
const authService = require('../../db_services/auth_services')

SignUp = (req, res) => {
    const user = req.body;
    let newUser;
    authService.findUserByEmail(req.body.email).then((user) => {
        if(user) {
            throw { status: 409, message: constants.ALREADY_EXISTS('User') };
        }

        return helper.hashingPassword(req.body.password);
    }).then((hasedPassword) => {
        let userInstance = {
            name: user.name,
            surname: user.surname,
            type: user.type,
            position: user.position,
            working_field: user.working_field,
            plans: user.plans,
            email: user.email,
            education: user.education,
            experience: user.experience,
            about: user.about,
            password: hasedPassword,
        };

        return authService.saveUser(userInstance);
    }).then((createdUser) => {
        if (!createdUser) {
            throw { status: 500, message: constants.SOMETHING_WENT_WRONG };
        }

        newUser = createdUser;
        return helper.generateAuthToken(createdUser._id);
    }).then((authToken) => {
        return res.status(200).json({
            success: true,
            user: newUser,
            access_token: authToken,
        });
    }).catch((err) => {
        return Error.errorHandling(res, 400, err)
    });
};

module.exports = {
    SignUp,
}

