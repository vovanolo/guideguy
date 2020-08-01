const express = require('express');

const pool = require('../db');
const { IsLoggedIn } = require('../middlewares');

const router = express.Router();

router.use(IsLoggedIn);

router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM visited_places', (error, results) => {
        if (error) next(error);
        res.json(results);
    });
});

router.post('/:id', (req, res, next) => {
    pool.query(`SELECT id FROM places WHERE id='${req.params.id}'`, (error, results) => {
        if (error) next(error);
        if (results.length <= 0) {
            res.status(404);
            next(`Error: place with id: ${req.params.id} not found`);
        }
        else {
            pool.query(`INSERT INTO visited_places (userId, placeId) VALUES ('${req.user.id}', '${req.params.id}')`, (error, results) => {
                if (error) next(error);
                res.json({ message: `User id(${req.user.id}) successfully visited place id(${req.params.id})` });
            });
        }
    });
});

module.exports = router;
