const express = require('express');
const bcrypt = require('bcrypt');

const pool = require('../db');
const { IsAdmin } = require('../middlewares');

const router = express.Router();

router.use(IsAdmin);

router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM users WHERE id='${req.params.id}'`, (error, results) => {
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 10, (error, password) => {
    pool.query(`INSERT INTO users (username, password, role) VALUES ('${req.body.username}', '${password}', '${req.body.role}')`,
      (error, results) => {
        if (error) throw error;
        res.json({ message: 'User added successfully' });
      }
    );
  });
});

router.patch('/:id', (req, res) => {
  pool.query(`SELECT id FROM users WHERE id='${req.params.id} LIMIT 1'`, (error, results) => {
    if (results.length <= 0) {
      res.status(404).json({ message: `Error: No user with id ${req.params.id} found` });
    }
    else {
      bcrypt.hash(req.body.password, 10, (error, password) => {
        if (error) throw error;
        pool.query(`UPDATE users SET username='${req.body.username}', password='${password}', role='${req.body.role}' WHERE id='${req.params.id}'`, (error, results) => {
          if (error) throw error;
          else {
            res.json({ message: 'User updated successfully' });
          }
        });
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  pool.query(`SELECT id FROM users WHERE id='${req.params.id} LIMIT 1'`, (error, results) => {
    if (results.length <= 0) {
      res.json({message: `Error: No user with id ${req.params.id} found`});
    }
    else {
      pool.query(`DELETE FROM users WHERE id='${req.params.id}'`, (error, results) => {
        if (error) throw error;
        else {
          res.json({ message: 'User deleted successfully' });
        }
      });
    }
  });
});

module.exports = router;