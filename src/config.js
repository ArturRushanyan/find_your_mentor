require('dotenv').config()

const config = {
    port: process.env.RUNNING_PORT || 3000,
};

module.exports = config;