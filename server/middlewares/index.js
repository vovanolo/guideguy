const jwt = require('jsonwebtoken');

require('dotenv').config();

function IsAdmin(req, res, next) {
  const authHeader = req.get('Authorization');
  if (authHeader != undefined) {
    const jwtToken = authHeader.split(' ')[1];
    jwt.verify(jwtToken, process.env.JWT_KEY, (err, decoded) => {
      if (!err) {
        if (decoded.role === 'admin') {
          next();
        }
        else {
          res.status(401).send('Unauthorized access');
        }
      }
      else {
        throw err;
      }
    });
  }
  else {
    res.status(401).send('Unauthorized access');
  }
}

function IsLoggedIn(req, res, next) {
  const authHeader = req.get('Authorization');
  if (authHeader != undefined) {
    const jwtToken = authHeader.split(' ')[1];
    jwt.verify(jwtToken, process.env.JWT_KEY, (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      }
      else {
        throw err;
      }
    });
  }
  else {
    res.status(401).send('Unauthorized access 1');
  }
}

function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🚫' : error.stack
  });
}

module.exports = { IsAdmin, IsLoggedIn, notFound, errorHandler };