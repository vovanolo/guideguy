function throwError(res, next, error, statusCode) {
    const newError = new Error(error);
    res.status(statusCode);
    next(newError);
}

module.exports = { throwError };