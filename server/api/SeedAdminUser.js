const bcrypt = require('bcrypt');

const pool = require('../db');

require('dotenv').config();

pool.query(`SELECT id FROM users WHERE role='admin' LIMIT 1`, (error, data) => {
  if (error) throw error;
  if (data.length > 0) {
    throw new Error('Admin user already exists.');
  }
  else {
    bcrypt.hash(process.env.ADMIN_PASSWORD, 10, (hashError, hashed) => {
      if (hashError) throw hashError;
      pool.query(`INSERT INTO users (username, password, role) VALUES ('${process.env.ADMIN_USERNAME}', '${hashed}', 'admin')`, (error, data) => {
        if (error) throw error;
        console.log('Admin user created1');
        pool.end(err => err && console.log(err));
      });
    });
  }
});