const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  pool.query(`SELECT id FROM admins WHERE username='${req.body.username}'`, (error, data) => {
    if (error) throw error;
    if (data.length > 0) {
      res.status(400).json({ message: 'This username is already taken' });
    }
    else {
      // Signup user
      bcrypt.hash(req.body.password, 10, (error, hashedPass) => {
        const username = req.body.username;
        const password = hashedPass;

        pool.query(`INSERT INTO admins (username, password) VALUES ('${username}', '${password}')`, (error, data) => {
          if (error) throw error;
          const newUser = {
            id: data.insertId,
            username: username,
            password: password
          };
          const jwtToken = jwt.sign(newUser, process.env.JWT_KEY);
          res.json(jwtToken);
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  pool.query(`SELECT * FROM admins WHERE username='${req.body.username}'`, (error, data) => {
    if (error) throw error;
    if (data.length <= 0) {
      res.status(404).json({ message: 'Check your login and password' });
    }
    else {
      const password = req.body.password;
      const hash = data[0].password;
      bcrypt.compare(password, hash, function(err, result) {
        if (result) {
          const user = {
            id: data[0].id,
            username: data[0].username,
            password: data[0].password
          };
          const jwtToken = jwt.sign(user, process.env.JWT_KEY);
          res.json(jwtToken);
        }
      });
    }
  });
});

module.exports = router;