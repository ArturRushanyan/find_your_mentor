const Schema =  require('../JoiSchemas/verifayingSchema');
const errorHandler = require('../utils/errors');
const Constants = require('../utils/const_messages');
const ManipulateData = require('../utils/helper')

const Registration = (req, res, next) => {
    const schema = Schema.SignUp;
    if (req.body.password !== req.body.confirmPassword) {
        return errorHandler(res, 422, { message: Constants.PASSWORDS_NOT_MATCH });
    }
    const result = schema.validate(req.body);

    if (result.error) {
        return errorHandler(res, 422, { message: result.error.details });
    }

    req.body = ManipulateData.prepareUserData(req.body, result.value);
    next();
};


const Login = (req, res, next) => {
    const schema = Schema.Login;
    const result = schema.validate(req.body);
    if (result.error) {
        return errorHandler( res, 422, { message: Constants.VALIDATION_ERROR });
    }

    req.body.email = result.value.email;
    req.body.password = result.value.password;
    next();
};

const updateUserData = (req, res, next) => {
    const schema = Schema.updateUserData;
    const result = schema.validate(req.body);

    if (result.error) {
        return errorHandler(res, 422, { message: Constants.VALIDATION_ERROR });
    }

    req.body = ManipulateData.prepareUserData(req.body, result.value, false)
    next();
};

module.exports = {
    Registration,
    Login,
    updateUserData
}
