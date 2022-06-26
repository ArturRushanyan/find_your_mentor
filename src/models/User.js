const mongoose = require('mongoose');
const moment = require("moment")
const user_enums = require('../config')

const Schema = mongoose.Schema;
const userId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        index: true,
        required: true,
        trim: true
    },
    surname:{
        type: String,
        index: true,
        required: true,
        trim: true
    },
    user_type: {
        type: String,
        index: true,
        enum : user_enums.user_type_enum,
        default: user_enums.user_type_enum[0]
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    working_field: {
        type: String,
        enum: user_enums.working_field_enum,
        default: user_enums.working_field_enum[0]
    },
    plans: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    education: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String,
        index: true,
        default: moment(new Date()).format('YYYY-MM-DD')
    },
    updatedAt: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD')
    }
});

let User = null;

try {
    User = mongoose.model('User', userSchema);
} catch (e) {
    User = mongoose.model('User');
}

module.exports = User;