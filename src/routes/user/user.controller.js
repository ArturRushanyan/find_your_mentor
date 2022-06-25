
const userService = require('../../db_services/user_services')
const Error = require('../../utils/errors')

const helper = require('../../utils/helper')
const config  = require('../../config')

const getMe = (req, res) => {
    // here we sending as respnse req.user becouse at 
    // JWT authentication phase we find the user and set it in the request object as property 
    return res.status(200).json({
        user: req.user
    })
}

const updateUserPersonalInformation = (req, res) => {
    const newInformation = req.body
    const loggedInUser = req.user


    userService.findUserByEmail(newInformation.email)
    .then(user => {
        // Checking if user updated his email and that email is exists in the system throwing error response
        if (user) {
            throw { 
                code: 409,
                msg: `User already exists with this email address ${newInformation.email}`
            }
        }
        return userService.updateUserCertainInformation(newInformation, loggedInUser.email)
    }).then(user => {
        return res.status(200).json({
            "user": user
        })
    }).catch(err => {
        return Error.errorHandling(res, 400, err)
    })
}

const getUserById = (req, res) => {
    const targetUserId = req.params.id
    userService.getUserById(targetUserId)
    .then(user => {
        if (!user) {
            return res.status(404).json({
                msg: `cannot find user by ${targetUserId} id`
            })
        }

        return res.status(200).json({
            user: user
        })

    }).catch(err => {
        return Error.errorHandling(res, 400, err)
    })
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
        return Error.errorHandling(res, 400, err.message)
    }
};

module.exports = {
    getMe,
    updateUserPersonalInformation,
    getUserById,
    getUsers
}