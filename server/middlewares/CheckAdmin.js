const jwt = require('jsonwebtoken');

require('dotenv').config();

function CheckAdmin(req, res, next) {
  // if (req.body.code == 'admin') {
  //   next();
  // }
  // else {
  //   res.send(402).json({ message: 'Unathorized' });
  // }

  const authHeader = req.get('Authorization');
  console.log('test');
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
    res.json({ test: typeof authHeader });
  }
}

module.exports = CheckAdmin;