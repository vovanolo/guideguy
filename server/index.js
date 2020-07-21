const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(express.json());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'guideguy'
});


app.use(cors({
  origin: 'http://localhost:3000'
}));

app.post('/', function(req, res) {
  connection.connect();
  connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  connection.end();
});

app.post('admin/places/add', function(req, res) {
  res.json(req.body);
});

const PORT = 3050;
app.listen(PORT);