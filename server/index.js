const express = require('express');
const app = express();
const cors = require('cors');
const volleyball = require('volleyball');

require('dotenv').config();

const places = require('./api/places');
const seed = require('./api/seed');
const auth = require('./api/auth');
const users = require('./api/users');
const visit = require('./api/visit');
const challenges = require('./api/challenges');
const { notFound, errorHandler } = require('./middlewares');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(volleyball);

app.use('/places', places);
app.use('/seed', seed);
app.use('/auth', auth);
app.use('/users', users);
app.use('/visit', visit);
app.use('/challenges', challenges);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => console.log(`Server is running at port ${process.env.APP_PORT}`));