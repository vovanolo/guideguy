const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/login', (req, res) => {
  pool.query(`SELECT * FROM users WHERE username='${req.body.username}' AND password='${req.body.password}'`, (err, results) => {
    if (err) {
      res.status(400).send(err);
    }
    else {
      if (results.length <= 0) {
        res.status(404).send('No user found');
      }
      else {
        res.json({code: 'admin'});
      }
    }
  });
});

module.exports = router;