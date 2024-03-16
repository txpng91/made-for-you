const Pool = require('pg').Pool;
const host = process.env.host;
const db = process.env.db;
const user = process.env.user;
const port = process.env.port;
const pw = process.env.pw;

// Specify a user
const client = new Pool({
  user: user,
  password: pw,
  host: host,
  port: port,
  database: db,
});

module.exports = client;
