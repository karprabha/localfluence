require('express-async-errors');
const morgan = require('morgan');
const express = require('express');

const { MORGAN_MODE, NODE_ENV } = require('../config');

const app = express();
app.use(express.json());

if (NODE_ENV !== 'test') {
  app.use(morgan(MORGAN_MODE));
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
