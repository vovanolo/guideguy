const express = require('express');
const app = express();
const cors = require('cors');
const volleyball = require('volleyball');
const mysql = require('mysql');

require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(volleyball);

// const connection = mysql.createConnection({
//   host     : process.env.DB_HOST,
//   user     : process.env.DB_USERNAME,
//   password : process.env.DB_PASSWORD,
//   database : process.env.DB_DATABASE
// });

// app.post('/', function(req, res) {
//   connection.connect();
//   connection.query('SELECT * FROM users', function (error, results, fields) {
//     if (error) throw error;
//     res.json(results);
//   });
//   connection.end();
// });

app.post('/admin/places/add', function(req, res) {
  res.json(req.body);
});

app.listen(process.env.APP_PORT, () => console.log(`Server is running at port ${process.env.APP_PORT}`));