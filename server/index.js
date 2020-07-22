const express = require('express');
const app = express();
const cors = require('cors');
const volleyball = require('volleyball');
const pool = require('./db');

const admin = require('./admin');

require('dotenv').config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(volleyball);

app.use('/admin', admin);

app.listen(process.env.APP_PORT, () => console.log(`Server is running at port ${process.env.APP_PORT}`));