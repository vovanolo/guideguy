const bcrypt = require('bcrypt');

require('dotenv').config();

const pool = require('../db');


pool.query('SELECT id FROM users WHERE role=\'admin\' LIMIT 1', (error, data) => {
  if (error) throw error;
  if (data.length > 0) {
    throw new Error('Admin user already exists.');
  }
  else {
    bcrypt.hash(process.env.ADMIN_PASSWORD, 10, (hashError, hashed) => {
      if (hashError) throw hashError;
      pool.query(`INSERT INTO users (username, password, role) VALUES ('${process.env.ADMIN_USERNAME}', '${hashed}', 'admin')`, (error) => {
        if (error) throw error;
        console.log('Admin user created');
        pool.end(err => err && console.log(err));
      });
    });
  }
});