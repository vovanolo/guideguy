const express = require('express');
const router = express.Router();
const pool = require('../db');
const CheckAdmin = require('../middlewares/CheckAdmin');

router.get('/', (req, res) => {
  pool.query('SELECT * FROM places', function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  pool.query(`SELECT * FROM places WHERE id='${req.params.id}'`, function(error, results) {
    res.json(results[0]);
  });
});

router.post('/', CheckAdmin, (req, res) => {
  pool.query(`INSERT INTO places (name, address, latlng, description) VALUES ('${req.body.name}', '${req.body.address}', '${req.body.latlng}', '${req.body.description}')`,
    function(error, results, fields) {
      if (error) throw error;
      res.json({message: 'Place added successfully'});
    }
  );
});

router.patch('/:id', CheckAdmin, (req, res) => {
  pool.query(`SELECT id FROM places WHERE id='${req.params.id} LIMIT 1'`, function (error, results) {
    if (results.length <= 0) {
      res.json({message: `Error: No place with id ${req.params.id} found`});
    }
    else {
      pool.query(`UPDATE places SET name='${req.body.name}', address='${req.body.address}', latlng='${req.body.latlng}', description='${req.body.latlng}' WHERE id='${req.params.id}'`, function(error, results) {
        if (error) throw error;
        else {
          res.json({message: 'Place updated successfully'});
        }
      });
    }
  });
});

router.delete('/:id', CheckAdmin, (req, res) => {
  pool.query(`SELECT id FROM places WHERE id='${req.params.id} LIMIT 1'`, (error, results) => {
    if (results.length <= 0) {
      res.json({message: `Error: No place with id ${req.params.id} found`});
    }
    else {
      pool.query(`DELETE FROM places WHERE id='${req.params.id}'`, (error, results) => {
        if (error) throw error;
        else {
          res.json({message: 'Place deleted successfully'});
        }
      });
    }
  });
});

module.exports = router;