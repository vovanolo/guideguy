const migration = require('mysql-migrations');
const pool = require('./db');

migration.init(pool, __dirname + '/migrations');