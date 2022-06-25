const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const config  = require('../config')
const constants = require('../utils/const_messages')


// This function return updated and validated data for request body
const prepareData = (body, updated_data, registrationFlow=true) => {
    body.name = updated_data.name;
    body.surname = updated_data.surname;
    body.user_type = updated_data.user_type;
    body.position = updated_data.position;
    body.working_field = updated_data.working_field;
    body.plans = updated_data.plans;
    body.email = updated_data.email;
    body.education = updated_data.education;
    body.experience = updated_data.experience;
    body.about = updated_data.about;
    
    // registrationFlow is "true" when user trying to register in system
    // registrationFlow is "false" when user is updating his personal information
    if (registrationFlow) {
        body.password = updated_data.password
    }   

    return body;
};

const hashingPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    });
};

const comparePassword = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

const generateAuthToken = (userId) => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            const err = {
                status: 400,
                message: constants.MISSING_USER_ID
            };
            reject(err);
        }
        resolve(JWT.sign({ _id: userId }, config.JWT_SECRET_KEY, { expiresIn: '1h' }));
    });
};

const verifyToken = (token) => {
    return new Promise((resolve) => {
        resolve(JWT.verify(token, config.JWT_SECRET_KEY));
    });
};


const filterQueryParameters = (accessibleQueryKeys, reqQuery) => {
    let tmp = {}

    accessibleQueryKeys.forEach(key => {
        if (reqQuery.hasOwnProperty(key)) {
            tmp[key] = reqQuery[key]
        }
    })
    
    return tmp
};

module.exports = {
    prepareData,
    hashingPassword,
    comparePassword,
    generateAuthToken,
    verifyToken,
    filterQueryParameters
}