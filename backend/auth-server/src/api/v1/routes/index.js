const router = require('express').Router();

const authRouter = require('./auth.routes');

router.use('/', authRouter);

module.exports = router;
