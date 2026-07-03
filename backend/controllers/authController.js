import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * Generate a JWT token signed for the user ID
 * @param {string} id - Database User ID
 * @returns {string} Signed JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

/**
 * @desc    Register a new user account
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User email is already registered.', 400);
    }

    // Create user in DB
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT
    const token = generateToken(user._id);

    return successResponse(
      res,
      'User registered successfully.',
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user credentials and issue token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Retrieve user including select: false password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return errorResponse(res, 'Invalid credentials provided.', 401);
    }

    // Verify password match
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials provided.', 401);
    }

    // Generate JWT
    const token = generateToken(user._id);

    return successResponse(res, 'Authentication successful.', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user session profile
 * @route   GET /api/auth/profile
 * @access  Private (Authenticated)
 */
export const getProfile = async (req, res, next) => {
  try {
    // req.user has been attached by the protect middleware
    return successResponse(res, 'Profile retrieved successfully.', {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
