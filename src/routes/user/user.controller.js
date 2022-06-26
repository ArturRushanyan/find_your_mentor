
const userService = require('../../db_services/user_services')
const errorHandler = require('../../utils/errors')
const helper = require('../../utils/helper')
const config  = require('../../config')
const const_maeesage = require('../../utils/const_messages');


const getMe = (req, res) => {
    // Here we sending as response req.user because at
    // JWT authentication phase we found the user and set it in the request object as property
    return res.status(200).json({
        user: req.user
    })
}

const updateUserPersonalInformation = async (req, res) => {
    const newInformation = req.body
    const loggedInUser = req.user

    try {
        const user = await userService.findUserByEmail(newInformation.email);

        // Checking if user updated his email and that email is exists in the system throwing error response
        if (user && loggedInUser.id !== user.id) {
            throw {
                code: 409,
                message: const_maeesage.ALREADY_EXISTS_WITH_THIS_EMAIL(newInformation.email)
            }
        }
        const updatedUser = await userService.updateUserCertainInformation(newInformation, loggedInUser.email)

        return res.status(200).json({updatedUser})

    } catch(err) {
        return errorHandler(res, err.code || 400, err)
    }
}

const getUserById = async (req, res) => {
    const targetUserId = req.params.id

    try {
        const user = await userService.getUserById(targetUserId)
        if (!user) {
            return res.status(404).json({
                message: const_maeesage.CANNOT_FIND_USER_BY_ID(targetUserId)
            })
        }

        return res.status(200).json({user})

    } catch(err) {
        return errorHandler(res, 400, err)
    }
};

const getUsers = async (req, res) => {
    
    // Checking have a query parameters in request or not
    const isEmptyQuery = Object.keys(req.query).length === 0;
    try {
        if (isEmptyQuery) {
            let users = await userService.getAllUsers();
            return res.status(200).json({ users })
        } else {
            const queryParameters = await helper.filterQueryParameters(config.accessibleQueryParameters, req.query)
            const usersList = await userService.getFilteredUsers(queryParameters)
            return res.status(200).send({usersList})
        }
    } catch(err) {
        return errorHandler(res, 400, err)
    }
}

module.exports = {
    getMe,
    updateUserPersonalInformation,
    getUserById,
    getUsers
}
