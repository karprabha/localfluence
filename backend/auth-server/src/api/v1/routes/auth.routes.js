const router = require('express').Router();

const { authValidator } = require('../validators');
const { authController } = require('../controllers');
const { queryValidationMiddleware } = require('../middlewares');

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

router.post(
  '/auth/refresh',
  authValidator.refreshAccessTokenValidator,
  queryValidationMiddleware,
  authController.refreshAccessToken,
);

module.exports = router;
