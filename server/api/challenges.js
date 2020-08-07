const express = require('express');

const pool = require('../db');
const { IsAdmin, IsLoggedIn } = require('../middlewares');
const { throwError } = require('../functions');

const router = express.Router();

router.get('/', (req, res, next) => {
  // Get challenges
  pool.query('SELECT * FROM challenges', (error, challenges) => {
    if (error) throwError(res, next, error, 500);
    let challenges1 = challenges.map((thing) => ({ challenge: thing, places: [] }));
    const response = [];
    challenges.forEach((challenge, index) => {
      const item = {
        challenge,
        places: [],
      };
      // Get connections
      pool.query(`SELECT * FROM challenges_places WHERE challenge_id='${challenge.id}'`, (error, info) => {
        if (error) throwError(res, next, error, 500);
        const placesCache = [];
        info.forEach((el, index) => {
          // Get places
          pool.query(`SELECT * FROM places WHERE id='${el.place_id}'`, (error, place) => {
            if (error) throwError(res, next, error, 500);
            placesCache.push(place[0]);
            challenges1 = challenges1.map((el1) => el1.challenge.id !== challenge.id ? el1 : { challenge: el1.challenge, places: [...el1.places, place[0]] });
            if (index === challenges.length - 1) {
              item.places = placesCache;
              response.push(item);
              console.log(el.place_id.toString());
            }
          });
        });
      });
      if (index === challenges.length - 1) {
        setTimeout(() => {
          res.json(challenges1);
        }, 3000);
      }
    });
  });
});

router.get('/:id', IsLoggedIn, (req, res, next) => {
  pool.query(`SELECT * FROM challenges WHERE id='${req.params.id}'`, function(error) {
    if (error) throwError(res, next, error, 500);
    pool.query(`SELECT * FROM challenges_places WHERE challenge_id='${req.params.id}'`, (error, info) => {
      if (error) throwError(res, next, error, 500);
      const placesId = info.map((el) => el.place_id);
      placesId.forEach((placeId) => {
        pool.query(`SELECT * FROM visited_places WHERE userId='${req.user.id}' AND placeId='${placeId}'`, (error, places) => {
          if (error) throwError(res, next, error, 500);
          if (places) {
            res.json(places);
          }
        });
      });
    });
  });
});

router.post('/', IsAdmin, (req, res, next) => {
  pool.query(`INSERT INTO challenges (title, description) VALUES ('${req.body.title}', '${req.body.description}')`, (error) => {
    if (error) throwError(res, next, error, 500);
    res.json({ message: 'Success' });
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

router.patch('/:id/place', (req, res, next) => {
  pool.query(`INSERT INTO challenges_places (challenge_id, place_id) VALUES ('${req.params.id}', '${req.body.placeId}')`, (error) => {
    if (error) throwError(res, next, error, 500);
    pool.query(`SELECT * FROM places WHERE id='${req.body.placeId}'`, (error, results) => {
      if (error) throwError(res, next, error, 500);
      res.json(results[0]);
    });
  });
});

module.exports = router;