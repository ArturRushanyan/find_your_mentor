const express = require('express');
const bodyParser = require('body-parser');
const logger  = require('morgan');
const mongoose =  require('mongoose');

const config = require('./config');
const routes = require('../src/routes/index');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.DB.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Successfully connected to the database')
}).catch((err) => {
    console.log('Could not connect to the database. Exiting now...');
    console.log('err ', err);
    process.exit();
});

routes(app);

app.listen(config.port, () => {
    console.log(`Server is up on port: ${config.port}`);
});