const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const pool = require('../db');
const { IsAdmin } = require('../middlewares');
const { throwError } = require('../functions');

const router = express.Router();

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM places', function(error, results) {
    if (error) throwError(res, next, error, 500);
    res.json(results);
  });
});

router.get('/:id', (req, res, next) => {
  pool.query(`SELECT * FROM places WHERE id='${req.params.id}'`, function(error, results) {
    if (error) throwError(res, next, error, 500);
    res.json(results[0]);
  });
});

router.post('/', IsAdmin, (req, res, next) => {
  pool.query(`INSERT INTO places (name, address, latlng, description) VALUES ('${req.body.name}', '${req.body.address}', '${req.body.latlng}', '${req.body.description}')`,
    function(error, results) {
      if (error) throwError(res, next, error, 500);
      const code = crypto.randomBytes(15).toString('hex');
      const payload = {
        placeId: results.insertId,
        code: code
      };
      jwt.sign(payload, process.env.JWT_KEY, (error, token) => {
        if (error) throwError(res, next, error, 500);
        pool.query(`INSERT INTO codes (placeId, code) VALUES ('${results.insertId}', '${token}')`, (error, results) => {
          if (error) throwError(res, next, error, 500);
          res.json({ placeId: payload.placeId, token });
        });
      });
    }
  );
});

router.patch('/:id', IsAdmin, (req, res, next) => {
  pool.query(`SELECT id FROM places WHERE id='${req.params.id} LIMIT 1'`, function (error, results) {
    if (results.length <= 0) {
      if (error) throwError(res, next, `Error: No place with id ${req.params.id} found`, 404);
    }
    else {
      pool.query(`UPDATE places SET name='${req.body.name}', address='${req.body.address}', latlng='${req.body.latlng}', description='${req.body.latlng}' WHERE id='${req.params.id}'`, function(error, results) {
        if (error) throwError(res, next, error, 500);
        else {
          res.json({ message: 'Place updated successfully' });
        }
      });
    }
  });
});

router.delete('/:id', IsAdmin, (req, res, next) => {
  pool.query(`SELECT id FROM places WHERE id='${req.params.id} LIMIT 1'`, (error, results) => {
    if (error) throwError(res, next, error, 500);
    if (results.length <= 0) {
      if (error) throwError(res, next, `Error: No place with id ${req.params.id} found`, 404);
    }
    else {
      pool.query(`DELETE FROM places WHERE id='${req.params.id}'`, (error, results) => {
        if (error) throwError(res, next, error, 500);
        else {
          res.json({ message: 'Place deleted successfully' });
        }
      });
    }
  });
});

module.exports = router;