const userModel = require('../models/User');

function findUserByEmail(email) {
    return userModel.findOne({ email });
}

function saveUser(newUser) {
    let user = new userModel(newUser);
    return user.save();
}

module.exports = {
    findUserByEmail,
    saveUser,
}

