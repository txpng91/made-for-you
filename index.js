// Web server
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init db client
const client = require('./db/index');
client.connect();

// Router: /v1/api
app.use('/v1/api', require('./api'));

// Listener
app.listen(port, () => {
  console.log(`Server has started on ${port}.`);
});
