const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../db');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  pool.query(`SELECT id FROM users WHERE username='${req.body.username}'`, (error, data) => {
    if (error) next(error);
    if (data.length > 0) {
      res.status(400);
      next('This username is already taken');
    }
    else {
      // Signup user
      bcrypt.hash(req.body.password, 10, (error, hashedPass) => {
        if (error) next(error);
        const username = req.body.username;
        const password = hashedPass;

        pool.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`, (error, results) => {
          if (error) next(error);
          pool.query(`SELECT id, username, role FROM users WHERE id='${results.insertId}'`, (error, data) => {
            if (error) next(error);
            const payload = JSON.parse(JSON.stringify(data[0]));
            const jwtToken = jwt.sign(payload, process.env.JWT_KEY);
            res.json(jwtToken);
          });
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  pool.query(`SELECT * FROM users WHERE username='${req.body.username}'`, (error, data) => {
    if (error) next(error);
    if (data.length <= 0) {
      res.status(404);
      next('Check your login and password');
    }
    else {
      const password = req.body.password;
      const hash = data[0].password;
      bcrypt.compare(password, hash, function(err, result) {
        if (result) {
          const user = {
            id: data[0].id,
            username: data[0].username,
            role: data[0].role
          };
          const jwtToken = jwt.sign(user, process.env.JWT_KEY);
          res.json(jwtToken);
        }
      });
    }
  });
});

module.exports = router;