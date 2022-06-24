function errorHandling(res, code, err) {
    return res.status(code).json({
        error: err
    });
};

module.exports = {
    errorHandling
};