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
    res.status(401).send('Unauthorized access');
  }
}

function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🚫' : error.stack
  })
}

function CheckVisitCode(req, res, next) {
  if (!req.body.visitCode) {
    const error = new Error('Visit code is invalid');
    res.status(400);
    next(error);
  }
  else {
    next();
  }
}

module.exports = { IsAdmin, IsLoggedIn, notFound, errorHandler, CheckVisitCode };