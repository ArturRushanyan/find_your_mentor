const userModel = require('../models/User');

const findUserByEmail = (email) => {
    return userModel.findOne({ email });
}

const saveUser = (newUser) => {
    let user = new userModel(newUser);
    return user.save();
}

const getUserById = (id) => {
    return userModel.findById(id);
}

module.exports = {
    findUserByEmail,
    saveUser,
    getUserById,
}

