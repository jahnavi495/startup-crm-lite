import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * PRODUCTION SECURITY BEST PRACTICE:
 * In a production environment, you should mount a rate limiter middleware here 
 * (using 'express-rate-limit') on auth endpoints (especially '/login' and '/register') 
 * to prevent brute-force attacks and credential stuffing.
 * Example:
 * const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
 * router.post('/login', authLimiter, ...);
 */

/**
 * Helper function to generate a signed JWT token for a given user ID.
 * Uses JWT_SECRET and expiration configuration from the environment variables.
 * 
 * @param {string} userId - Mongoose User ObjectId string
 * @returns {string} Signed JWT Token string
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'fallback_secret',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

/**
 * Registers a new user account in the system.
 * Checks for existing email address, hashes the password via schema hooks,
 * generates a JWT token, and returns the response without the password field.
 * 
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User email is already registered.', 400);
    }

    // 2. Create and save the new user (hashing password is handled in pre-save model middleware)
    const user = await User.create({
      name,
      email,
      password,
    });

    // 3. Generate access token
    const token = generateToken(user._id);

    // 4. Return serialized user details without the password (toJSON handles password stripping)
    return successResponse(
      res,
      {
        user: user.toJSON(),
        token,
      },
      'User registered successfully.',
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticates user credentials and issues a JWT token.
 * Prevents enumeration attacks by returning a generic "Invalid credentials" error message.
 * Verifies if the account is active before authenticating.
 * 
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Retrieve the user record including the hidden password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // 2. Check if the account is active
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated', 403);
    }

    // 3. Verify the input password against the stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // 4. Generate access token
    const token = generateToken(user._id);

    // 5. Serialize user (strip password)
    return successResponse(
      res,
      {
        user: user.toJSON(),
        token,
      },
      'Authentication successful.'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves the profile details of the currently authenticated user.
 * 
 * @route   GET /api/auth/profile
 * @access  Private (Authenticated)
 */
export const getProfile = async (req, res, next) => {
  try {
    // req.user has already been populated by the protect middleware
    return successResponse(
      res,
      { user: req.user.toJSON() },
      'Profile retrieved successfully.'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Updates the profile details of the logged-in user.
 * Restricts updates to the "name" field only.
 * If a new password is provided, verifies the old password first before updating.
 * 
 * @route   PUT /api/auth/profile
 * @access  Private (Authenticated)
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    
    // Retrieve the active user document (including password for validation)
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return errorResponse(res, 'User no longer exists', 404);
    }

    // 1. Update the name if provided
    if (name !== undefined) {
      user.name = name;
    }

    // 2. Update the password if newPassword is provided
    if (newPassword) {
      if (!oldPassword) {
        return errorResponse(res, 'Old password is required to change password.', 400);
      }

      // Check if the input old password matches the current database hash
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return errorResponse(res, 'Invalid old password.', 401);
      }

      // Set new password (the user pre-save hook will automatically hash this)
      user.password = newPassword;
    }

    // 3. Save the document and trigger validations/hooks
    await user.save();

    // 4. Return the updated user document (stripped of the password field)
    return successResponse(
      res,
      { user: user.toJSON() },
      'Profile updated successfully.'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Terminates the active session (stateless helper response).
 * 
 * @route   POST /api/auth/logout
 * @access  Private (Authenticated)
 */
export const logout = async (req, res, next) => {
  try {
    return successResponse(
      res,
      null,
      'Logged out successfully.'
    );
  } catch (error) {
    next(error);
  }
};
