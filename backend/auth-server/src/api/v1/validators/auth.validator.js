const { body } = require('express-validator');
const { User } = require('../models');

const signupValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be at most 100 characters'),
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isEmail()
    .withMessage('Username is not an email')
    .isLength({ max: 50 })
    .withMessage('Username must be at most 50 characters')
    .custom(async (value) => {
      const existingUser = await User.findOne({
        where: {
          username: value,
        },
      });

      if (existingUser) {
        throw new Error('Username is already in use');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one digit')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>))',
    ),
  body('avatar_url')
    .optional()
    .isURL()
    .withMessage('Invalid URL format for the avatar')
    .isLength({ min: 10, max: 255 })
    .withMessage('Avatar URL must be between 10 and 255 characters'),
];

const loginValidator = [
  body('username').notEmpty().withMessage('Username/Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const logoutValidator = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

const refreshAccessTokenValidator = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

module.exports = {
  loginValidator,
  logoutValidator,
  signupValidator,
  refreshAccessTokenValidator,
};
