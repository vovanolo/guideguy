function throwError(res, next, error, statusCode) {
    next(error);
}

module.exports = { throwError };