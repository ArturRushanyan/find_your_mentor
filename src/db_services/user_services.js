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


const updateUserCertainInformation = (newInfo) => {
    return userModel.findOneAndUpdate({email: newInfo.email}, { $set: newInfo }, { new: true });
}

module.exports = {
    findUserByEmail,
    saveUser,
    getUserById,
    updateUserCertainInformation
}

