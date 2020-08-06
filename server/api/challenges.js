const express = require('express');

const pool = require('../db');
const { IsAdmin } = require('../middlewares');
const { throwError } = require('../functions');

const router = express.Router();

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM challenges', function(error, results) {
    if (error) throwError(res, next, error, 500);
    if (results.length <= 0) {
      throwError(req, next, 'No challenges found in db', 400);
    }
    res.json(results);
  });
});

router.get('/:id', (req, res, next) => {
  pool.query(`SELECT * FROM challenges WHERE id='${req.params.id}'`, function(error, results) {
    if (error) throwError(res, next, error, 500);
    res.json(results[0]);
  });
});

router.post('/', IsAdmin, (req, res, next) => {
  pool.query(`INSERT INTO challenges (title, description) VALUES ('${req.body.title}', '${req.body.description}')`,
    function(error) {
      if (error) throwError(res, next, error, 500);
    }
  );
});

router.patch('/:id', IsAdmin, (req, res, next) => {
  pool.query(`SELECT id FROM challenges WHERE id='${req.params.id} LIMIT 1'`, function (error, results) {
    if (results.length <= 0) {
      if (error) throwError(res, next, `Error: No challenge with id ${req.params.id} found`, 404);
    }
    else {
      pool.query(`UPDATE challenges SET title='${req.body.title}', description='${req.body.description}' WHERE id='${req.params.id}'`, function(error) {
        if (error) throwError(res, next, error, 500);
        else {
          res.json({ message: 'Challenge updated successfully' });
        }
      });
    }
  });
});

router.delete('/:id', IsAdmin, (req, res, next) => {
  pool.query(`SELECT id FROM challenges WHERE id='${req.params.id} LIMIT 1'`, (error, results) => {
    if (error) throwError(res, next, error, 500);
    if (results.length <= 0) {
      if (error) throwError(res, next, `Error: No challenge with id ${req.params.id} found`, 404);
    }
    else {
      pool.query(`DELETE FROM challenges WHERE id='${req.params.id}'`, (error) => {
        if (error) throwError(res, next, error, 500);
        else {
          res.json({ message: 'Challenge deleted successfully' });
        }
      });
    }
  });
});

module.exports = router;