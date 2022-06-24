const Joi = require('joi');
const user_enums = require('../config')


// here we definign schema for data which is comming form request body
const required_fields = {
    name: Joi.string().required().min(5).max(40),
    surname: Joi.string().required().min(5).max(40).trim(),
    type: Joi.string().valid(...user_enums.user_type_enum),
    position: Joi.string().required().min(5).max(40).trim(),
    working_field: Joi.string().valid(...user_enums.working_field_enum),
    plans: Joi.string().required().min(5).max(100).trim(),
    email: Joi.string().required().min(5).max(40).trim(),
    education: Joi.string().required().min(5).max(100).trim(),
    experience: Joi.string().required().min(5).max(100).trim(),
    about: Joi.string().required().min(5).max(100).trim(),
}

module.exports = {
    SignUp: Joi.object().keys({
        ...required_fields,
        password: Joi.string().required().min(6).max(20).trim(),
        confirmPassword: Joi.ref('password'),
    })

};

