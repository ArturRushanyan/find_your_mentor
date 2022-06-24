
// Error
const Error = require('../../utils/errors');

// helpers
const helper = require('../../utils/helper')
const constants =  require('../../utils/const_messages');

// Services
const userService = require('../../db_services/user_services')

SignUp = (req, res) => {
    const user = req.body;
    let newUser;
    userService.findUserByEmail(req.body.email).then((user) => {
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

        return userService.saveUser(userInstance);
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

Login = (req, res) => {
    let user;

    userService.findUserByEmail(req.body.email).then(result => {
        if (!result) {
            throw  { status: 404, message: constants.NOT_EXISTS('user') };
        }
        user = result;

        return helper.comparePassword(req.body.password, user.password);
    }).then((isMatch) => {
        if (!isMatch) {
            throw  { status: 403, message: constants.INCORRECT_PASSWORD };
        }

        return helper.generateAuthToken(user._id)
    }).then(token => {

        return res.status(200).json({
            success: true,
            access_token: token,
            user,
        });

    }).catch(err => {
        return Error.errorHandling(res, 400, err)
    })
};

module.exports = {
    SignUp,
    Login,
}

