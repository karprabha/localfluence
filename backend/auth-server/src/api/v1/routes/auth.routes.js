const router = require('express').Router();

const { authController } = require('../controllers');

router.get('/auth/github', authController.githubOAuth);

router.get('/auth/google', authController.googleOAuth);

module.exports = router;
