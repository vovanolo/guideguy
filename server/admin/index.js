const express = require('express');
const router = express.Router();
const pool = require('../db');
const faker = require('faker');

//#region places

router.get('/places', function(req, res) {
  pool.query('SELECT * FROM places', function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/places/:id', function(req, res) {
  pool.query(`SELECT * FROM places WHERE id='${req.params.id}'`, function(error, results) {
    res.json(results[0]);
  });
});

router.post('/places', function(req, res) {
  pool.query(`INSERT INTO places (name, adress, latlng, description) VALUES ('${req.body.name}', '${req.body.adress}', '${req.body.latlng}', '${req.body.description}')`,
    function(error, results, fields) {
      if (error) throw error;
      res.json({message: 'Place added successfully'});
    }
  );
});

router.patch('/places/:id', function(req, res) {
  pool.query(`SELECT id FROM places WHERE id='${req.params.id} LIMIT 1'`, function (error, results) {
    if (results.length <= 0) {
      res.json({message: `Error: No place with id ${req.params.id} found`});
    }
    else {
      pool.query(`UPDATE places SET name='${req.body.name}', adress='${req.body.adress}', latlng='${req.body.latlng}', description='${req.body.latlng}' WHERE id='${req.params.id}'`, function(error, results) {
        if (error) throw error;
        else {
          res.json({message: 'Place updated successfully'});
        }
      });
    }
  });
});

//#endregion

//#region seeds

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

//#endregion

module.exports = router;