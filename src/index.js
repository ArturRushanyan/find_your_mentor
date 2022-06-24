const express = require('express');
const config = require('./config');

const app = express();

app.listen(config.port, () => {
    console.log(`Server is up on port: ${config.port}`);
});