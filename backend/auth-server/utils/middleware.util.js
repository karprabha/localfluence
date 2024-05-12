const logger = require('./logger.util');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'endpoint not found' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token missing or invalid' });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  next(err);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
