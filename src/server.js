const mongoose =  require('mongoose');
const bodyParser = require('body-parser');
const logger  = require('morgan');

const config = require('./config');
const routes = require('../src/routes/index');

const startServer = async (app, ) => {
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    await mongoose.connect(config.DB.url, {
        useNewUrlParser: true,
    });

    routes(app);

    app.listen(config.port, () => {
        console.log(`Server is up on port: ${config.port}`);
    });
};

module.exports = startServer;
