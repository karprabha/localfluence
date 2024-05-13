const { validationResult } = require('express-validator');

const queryValidationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { queryValidationMiddleware };
