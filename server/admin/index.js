const express = require('express');
const router = express.Router();
const pool = require('../db');
const faker = require('faker');
const CheckAdmin = require('../middlewares/CheckAdmin');

router.use(CheckAdmin);

router.post('/seed/users', (req, res) => {
  const count = req.body.count;
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO users (username) VALUES ('${faker.internet.userName()}')`, (error, results) => {
      if (error) throw error;
    });
  }
  res.json({message: 'Users created sucessfully'});
});

router.post('/seed/places', (req, res) => {
  const count = req.body.count;
  for (let i = 0; i < count; i++) {
    pool.query(`INSERT INTO places (name, adress, latlng, thumbnail, description) VALUES ('${faker.address.streetName()}', '${faker.address.streetAddress()}', '${faker.address.latitude()},${faker.address.longitude()}', '${faker.image.imageUrl()}', '${faker.lorem.paragraph(10)}')`, (error, results) => {
      if (error) throw error;
    });
  }
  res.json({message: 'Places created sucessfully'});
});

module.exports = router;