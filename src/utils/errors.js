function errorHandler(res, code, error) {
    return res.status(code).send({ error: error.message });
};

module.exports = errorHandler;
