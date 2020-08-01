const express = require('express');
const faker = require('faker');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const pool = require('../db');
const { IsAdmin } = require('../middlewares');

const router = express.Router();

router.use(IsAdmin);

router.post('/users', (req, res, next) => {
  const count = req.body.count;
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO users (username) VALUES ('${faker.internet.userName()}')`, (error, results) => {
      if (error) next(error);
    });
  }
  res.json({message: 'Users created successfully'});
});

router.post('/places', (req, res, next) => {
  const count = req.body.count;
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO places (name, address, latlng, thumbnail, description) VALUES ('${faker.address.streetName()}', '${faker.address.streetAddress()}', '${faker.address.latitude()},${faker.address.longitude()}', '${faker.image.imageUrl()}', '${faker.lorem.paragraph(10)}')`, (error, results) => {
      if (error) throw(error);
      const code = crypto.randomBytes(15).toString('hex');
      const payload = {
        placeId: results.insertId,
        code: code
      };
      jwt.sign(payload, process.env.JWT_KEY, (error, token) => {
        if (error) next(error);
        pool.query(`INSERT INTO codes (placeId, code) VALUES ('${results.insertId}', '${code}')`, (error, results) => {
          if (error) throw(error);
          console.log(`PlaceId: ${results.insertId}\nToken: ${token}`);
        });
      });
    });
  }
  res.json({ message: 'Places added successfully' });
});

module.exports = router;