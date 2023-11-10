const Pool = require('pg').Pool;

// Specify a user
const client = new Pool({
  user: 'postgres',
  password: '91Pet@rva',
  host: 'localhost',
  port: 5432,
  database: 'madeforyou',
});

module.exports = client;
