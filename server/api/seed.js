const express = require('express');
const faker = require('faker');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const pool = require('../db');
const { IsAdmin } = require('../middlewares');
const { throwError } = require('../functions');

const router = express.Router();

router.use(IsAdmin);

router.post('/users', (req, res, next) => {
  const count = req.body.count;
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO users (username) VALUES ('${faker.internet.userName()}')`, (error) => {
      if (error) throwError(res, next, error, 500);
    });
  }
  res.json({ message: 'Users created successfully' });
});

router.post('/places', (req, res, next) => {
  const count = req.body.count;
  const places = [];
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO places (name, address, latlng, thumbnail, description) VALUES ('${faker.address.streetName()}', '${faker.address.streetAddress()}', '${faker.address.latitude()},${faker.address.longitude()}', '${faker.image.imageUrl()}', '${faker.lorem.paragraph(10)}')`, (error, results) => {
      // if (error) throwError(res, next, error, 500);
      console.log(error);
      const code = crypto.randomBytes(15).toString('hex');
      const payload = {
        placeId: results.insertId,
        code: code
      };
      jwt.sign(payload, process.env.JWT_KEY, (error, token) => {
        if (error) throwError(res, next, error, 500);
        pool.query(`INSERT INTO codes (placeId, code) VALUES ('${results.insertId}', '${token}')`, (error) => {
          if (error) throwError(res, next, error, 500);
          pool.query(`SELECT * FROM places WHERE id='${payload.placeId}'`, (error, results) => {
            if (error) throw(res, next, error, 500);
            const newPlace = {
              ...results[0],
              token
            };
            places.push(newPlace);
            if (i === count - 1) {
              sendResponse();
            }
          });
        });
      });
    });
  }

  function sendResponse() {
    res.json(places);
  }
});

module.exports = router;