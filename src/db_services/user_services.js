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


const updateUserCertainInformation = (newInfo, loggedInUserEmail) => {
    return userModel.findOneAndUpdate({
        email: loggedInUserEmail
    }, 
    { 
        $set: newInfo, 
        updatedAt: Date.now() 
    }, 
    { 
        new: true 
    });
}

module.exports = {
    findUserByEmail,
    saveUser,
    getUserById,
    updateUserCertainInformation
}

