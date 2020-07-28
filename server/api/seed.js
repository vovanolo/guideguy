const express = require('express');
const faker = require('faker');

const pool = require('../db');
const { IsAdmin } = require('../middlewares');

const router = express.Router();

router.use(IsAdmin);

router.post('/users', (req, res) => {
  const count = req.body.count;
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO users (username) VALUES ('${faker.internet.userName()}')`, (error, results) => {
      if (error) throw error;
    });
  }
  res.json({message: 'Users created successfully'});
});

router.post('/places', (req, res) => {
  const count = req.body.count;
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO places (name, address, latlng, thumbnail, description) VALUES ('${faker.address.streetName()}', '${faker.address.streetAddress()}', '${faker.address.latitude()},${faker.address.longitude()}', '${faker.image.imageUrl()}', '${faker.lorem.paragraph(10)}')`, (error, results) => {
      if (error) throw error;
    });
  }
  res.json({message: 'Places created successfully'});
});

module.exports = router;