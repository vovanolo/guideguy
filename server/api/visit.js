const express = require('express');

const pool = require('../db');
const { IsLoggedIn, CheckVisitCode } = require('../middlewares');

const router = express.Router();

router.use(IsLoggedIn);

router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM visited_places', (error, results) => {
        if (error) next(error);
        res.json(results);
    });
});

router.post('/:id', CheckVisitCode, (req, res, next) => {
    pool.query(`SELECT id FROM codes WHERE placeId='${req.params.id}' AND code='${req.body.visitCode}' LIMIT 1`, (error, results) => {
        if (error) next(error);
        if (results.length <= 0) {
            const error = new Error('Invalid data');
            res.status(404);
            next(error);
        }
        else {
            pool.query(`SELECT id FROM visited_places WHERE placeId='${req.params.id}' AND userId='${req.user.id}' LIMIT 1`, (error, results) => {
                if (error) next(error);
                if (results.length > 0) {
                    const error = new Error('You have already visited this place');
                    res.status(400);
                    next(error);
                }
                else {
                    pool.query(`INSERT INTO visited_places (userId, placeId) VALUES ('${req.user.id}', '${req.params.id}')`, (error, results) => {
                        if (error) next(error);
                        res.json({ message: `User id(${req.user.id}) successfully visited place id(${req.params.id})` });
                    });
                }
            })
        }
    });
});

module.exports = router;
