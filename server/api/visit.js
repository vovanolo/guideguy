const express = require('express');
const jwt = require('jsonwebtoken');

const pool = require('../db');
const { IsLoggedIn } = require('../middlewares');
const { throwError } = require('../functions');

const router = express.Router();

router.use(IsLoggedIn);

router.post('/', (req, res, next) => {
  const { userId, placeId } = req.body;
  if (userId && placeId) {
    pool.query(`SELECT * FROM visited_places WHERE userId='${userId}' AND placeId='${placeId}'`, (error, results) => {
      if (error) throwError(res, next, error, 500);
      res.json(results);
    });
  }
  else if (userId) {
    pool.query(`SELECT * FROM visited_places WHERE userId='${userId}'`, (error, results) => {
      if (error) throwError(res, next, error, 500);
      res.json(results);
    });
  }
  else if (placeId) {
    pool.query(`SELECT * FROM visited_places WHERE placeId='${placeId}'`, (error, results) => {
      if (error) throwError(res, next, error, 500);
      res.json(results);
    });
  }
  else {
    pool.query('SELECT * FROM visited_places', (error, results) => {
      if (error) throwError(res, next, error, 500);
      res.json(results);
    });
  }
});

router.post('/:visitToken', (req, res, next) => {
  jwt.verify(req.params.visitToken, process.env.JWT_KEY, (error, decoded) => {
    if (error) throwError(res, next, error, 500);
    pool.query(`SELECT id FROM codes WHERE placeId='${decoded.placeId}' LIMIT 1`, (error, results) => {
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
            pool.query(`INSERT INTO visited_places (userId, placeId) VALUES ('${req.user.id}', '${decoded.placeId}')`, (error) => {
              if (error) throwError(res, next, error, 500);
              pool.query(`SELECT challenge_id FROM challenges_places WHERE place_id='${decoded.placeId}'`, (error, challengeId) => {
                if (error) throwError(res, next, error, 500);
                pool.query(`SELECT place_id FROM challenges_places WHERE challenge_id='${challengeId[0].challenge_id}'`, (error, placeIds, fields) => {
                  if (error) throwError(res, next, error, 500);
                  let placesCount = 0;
                  placeIds.forEach((placeId, index) => {
                    pool.query(`SELECT * FROM visited_places WHERE placeId='${placeId.place_id}' AND userId='${req.user.id}'`, (error, places) => {
                      if (error) throwError(res, next, error, 500);
                      if (places.length > 0) {
                        placesCount++;
                      }
                      if (placesCount >= placeIds.length) {
                        pool.query(`INSERT INTO users_finished_challenges (user_id, challenge_id) VALUES ('${req.user.id}', '${challengeId[0].challenge_id}')`, (error, results) => {
                          if (error) throwError(res, next, error, 500);
                          res.json({ message: 'User successfully finished challenge #' + challengeId[0].challenge_id });
                          pool.end();
                        });
                      }
                      else if (index === placeIds.length - 1) {
                        res.json({ message: `User id(${req.user.id}) successfully visited place id(${decoded.placeId})` });
                        pool.end();
                      }
                    });
                  });
                });
              });
            });
          }
        });
      }
    });
  });
});

module.exports = router;
