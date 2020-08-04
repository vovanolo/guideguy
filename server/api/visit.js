const express = require('express');
const jwt = require('jsonwebtoken');

const pool = require('../db');
const { IsLoggedIn } = require('../middlewares');
const { throwError } = require('../functions');

const router = express.Router();

router.use(IsLoggedIn);

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM visited_places', (error, results) => {
    if (error) throwError(res, next, error, 500);
    res.json(results);
  });
});

router.get('/:visitToken', (req, res, next) => {
  jwt.verify(req.params.visitToken, process.env.JWT_KEY, (error, decoded) => {
    if (error) throwError(res, next, error, 500);
    pool.query(`SELECT id FROM codes WHERE code='${decoded.code}' AND placeId='${decoded.placeId}' LIMIT 1`, (error, results) => {
      if (error) throwError(res, next, error, 500);
      if (results.length <= 0) {
        throwError(res, next, 'Invalid data', 403);
      }
      else {
        pool.query(`SELECT id FROM visited_places WHERE placeId='${decoded.placeId}' AND userId='${req.user.id}' LIMIT 1`, (error, results) => {
          if (error) throwError(res, next, error, 500);
          if (results.length > 0) {
            throwError(res, next, 'You have already visited this place', 403);
          }
          else {
            pool.query(`INSERT INTO visited_places (userId, placeId) VALUES ('${req.user.id}', '${decoded.placeId}')`, (error, results) => {
              if (error) throwError(res, next, error, 500);
              res.json({ message: `User id(${req.user.id}) successfully visited place id(${decoded.placeId})` });
            });
          }
        })
      }
    });
  });
});

module.exports = router;
