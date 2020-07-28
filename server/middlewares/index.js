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

function LoggedIn(req, res, next) {
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

module.exports = { IsAdmin, LoggedIn };