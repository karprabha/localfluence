const router = require('express').Router();

const { authController } = require('../controllers');
const { queryValidationMiddleware } = require('../middlewares');
const { authValidator } = require('../validators');

router.post('/auth/oauth', authController.oAuth);

router.get('/auth/github', authController.githubOAuth);

router.get('/auth/google', authController.googleOAuth);

router.post(
  '/auth/signup',
  authValidator.signupValidator,
  queryValidationMiddleware,
  authController.signUp,
);

router.post(
  '/auth/login',
  authValidator.loginValidator,
  queryValidationMiddleware,
  authController.login,
);

router.post(
  '/auth/logout',
  authValidator.logoutValidator,
  queryValidationMiddleware,
  authController.logout,
);

module.exports = router;
