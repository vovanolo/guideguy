function throwError(res, next, error, statusCode) {
<<<<<<< HEAD
    const newError = new Error(error);
    // res.status(statusCode);
    next(newError);
=======
    next(error);
>>>>>>> 916b8e95e69679638ccc9dea64f4396b93d82c7e
}

module.exports = { throwError };