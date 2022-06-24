
const userService = require('../../db_services/user_services')
const Error = require('../../utils/errors')

const getMe = (req, res) => {
    // here we sending as respnse req.user becouse at 
    // JWT authentication phase we find the user and set it in the request object as property 
    return res.status(200).json({
        user: req.user
    })
}

const updateUserPersonalInformation = (req, res) => {
    const newInformation = req.body

    userService.updateUserCertainInformation(newInformation).then(user => {
        return res.status(200).json({
            "user": user
        })
    }).catch(err => {
        return Error.errorHandling(res, 400, err)
    })
}

module.exports = {
    getMe,
    updateUserPersonalInformation
}