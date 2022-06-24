const express = require('express');
const bodyParser = require('body-parser');
const logger  = require('morgan');

const config = require('./config');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(config.port, () => {
    console.log(`Server is up on port: ${config.port}`);
});