const mongoose = require('mongoose');
const user_enums = require('../config')

const Schema = mongoose.Schema;
const userId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname:{
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
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
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

let User = null;

try {
    User = mongoose.model('User', userSchema);
} catch (e) {
    User = mongoose.model('User');
}

module.exports = User;