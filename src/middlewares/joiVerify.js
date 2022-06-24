const Schema =  require('../utils/verifayingSchema');
const Error = require('../utils/errors');
const Constants = require('../utils/const_messages');
const ManipulateData = require('../utils/helper')

exports.Registration = (req, res, next) => {
    const schema = Schema.SignUp;
    if (req.body.password !== req.body.confirmPassword) {
        return Error.errorHandling(res, 422, Constants.PASSWORDS_NOT_MATCH)
    }
    const result = schema.validate(req.body);

    if (result.error) {
        return Error.errorHandling(res, 422, {message: Constants.VALIDATION_ERROR, serverError: result.error.details})
    }

    req.body = ManipulateData.prepareData(req.body, result.value)
    next();
};



