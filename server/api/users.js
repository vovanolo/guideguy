const express = require('express');
const bcrypt = require('bcrypt');

const pool = require('../db');
const { IsAdmin } = require('../middlewares');
const { throwError } = require('../functions');

const router = express.Router();

router.use(IsAdmin);

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) throwError(res, next, error, 500);
    res.json(results);
  });
});

router.get('/:id', (req, res, next) => {
  pool.query(`SELECT * FROM users WHERE id='${req.params.id}'`, (error, results) => {
    if (error) throwError(res, next, error, 500);
    res.json(results[0]);
  });
});

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (hashError, password) => {
    if (hashError) throwError(res, next, hashError, 500);
    pool.query(`INSERT INTO users (username, password, role) VALUES ('${req.body.username}', '${password}', '${req.body.role}')`,
      (error) => {
        if (error) throwError(res, next, error, 500);
        res.json({ message: 'User added successfully' });
      }
    );
  });
});

router.patch('/:id', (req, res, next) => {
  pool.query(`SELECT id FROM users WHERE id='${req.params.id} LIMIT 1'`, (error, results) => {
    if (error) throwError(res, next, error, 500);
    if (results.length <= 0) {
      throwError(res, next, `Error: No user with id ${req.params.id} found`, 404);
    }
    else {
      bcrypt.hash(req.body.password, 10, (hashError, password) => {
        if (hashError) throwError(res, next, hashError, 500);
        pool.query(`UPDATE users SET username='${req.body.username}', password='${password}', role='${req.body.role}' WHERE id='${req.params.id}'`, (error) => {
          if (error) throwError(res, next, error, 500);
          else {
            res.json({ message: 'User updated successfully' });
          }
        });
      });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  pool.query(`SELECT id FROM users WHERE id='${req.params.id} LIMIT 1'`, (error, results) => {
    if (results.length <= 0) {
      if (error) throwError(res, next, `Error: No user with id ${req.params.id} found`, 404);
    }
    else {
      pool.query(`DELETE FROM users WHERE id='${req.params.id}'`, (error) => {
        if (error) throwError(res, next, error, 500);
        else {
          res.json({ message: 'User deleted successfully' });
        }
      });
    }
  });
});

module.exports = router;