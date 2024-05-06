require('express-async-errors');
const morgan = require('morgan');
const express = require('express');

const { middleware } = require('../utils');
const { MORGAN_MODE, NODE_ENV } = require('../config');
const v1Router = require('./api/v1/routes');

const app = express();
app.use(express.json());

if (NODE_ENV !== 'test') {
  app.use(morgan(MORGAN_MODE));
}

app.get('/', (req, res) => {
  res.json({ message: 'welcome to auth server' });
});

app.get('/health', (req, res) => {
  res.json({ message: 'Healthy' });
});

app.use('/v1', v1Router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
