require('dotenv').config()

const db_host = process.env.DB_HOST || 'localhost';
const db_port = process.env.DB_PORT || 27017;
const db_name = process.env.DB_NAME || 'db_mentorly';

const config = {
    port: process.env.RUNNING_PORT || 3000,
    DB: {
        url: `mongodb://${db_host}:${db_port}/${db_name}`,
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    user_working_filed_enum: process.env.WORKING_FIELD || [],
    user_type_enum: process.env.USER_TYPE || []
};

module.exports = config;