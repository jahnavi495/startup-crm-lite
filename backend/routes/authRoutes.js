import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

/**
 * Validation rules for user registration request payload
 */
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
];

/**
 * Validation rules for user authentication/login request payload
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.'),
];

/**
 * Validation rules for profile update request payload
 */
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters.'),
  body('newPassword')
    .optional()
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long.'),
  body('oldPassword')
    .optional()
    .notEmpty()
    .withMessage('Old password is required to change password.'),
];

// --- Authentication Route Declarations ---

// Route 1: Register a new user account (Public)
router.post('/register', validate(registerValidation), register);

// Route 2: Authenticate user credentials and sign JWT (Public)
router.post('/login', validate(loginValidation), login);

// Route 3: Retrieve current user session profile (Private)
router.get('/profile', protect, getProfile);

// Route 4: Update current user profile name and/or password (Private)
router.put('/profile', protect, validate(updateProfileValidation), updateProfile);

// Route 5: Log out of the current session (Private)
router.post('/logout', protect, logout);

export default router;
