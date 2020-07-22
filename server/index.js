const express = require('express');
const app = express();
const cors = require('cors');
const volleyball = require('volleyball');
const mysql = require('mysql');
const { query } = require('express');

require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(volleyball);

const pool = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

// app.post('/', function(req, res) {
//   connection.connect();
//   connection.query('SELECT * FROM users', function (error, results, fields) {
//     if (error) throw error;
//     res.json(results);
//   });
//   connection.end();
// });

app.get('/admin/places', function(req, res) {
  pool.query('SELECT * FROM places', function(error, results) {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/admin/places/:id', function(req, res) {
  pool.query(`SELECT * FROM places WHERE id='${req.params.id}'`, function(error, results) {
    res.json(results[0]);
  });
});

app.post('/admin/places/add', function(req, res) {
  pool.query(`INSERT INTO places (name, adress, latlng, description) VALUES ('${req.body.name}', '${req.body.adress}', '${req.body.latlng}', '${req.body.description}')`,
    function(error, results, fields) {
      if (error) throw error;
      res.json({message: 'Place added successfully'});
    }
  );
});

app.patch('/admin/places/:id', function(req, res) {
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

app.listen(process.env.APP_PORT, () => console.log(`Server is running at port ${process.env.APP_PORT}`));