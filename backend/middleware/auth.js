import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/apiResponse.js';

/**
 * Express middleware to protect routes by validating incoming JWT Bearer tokens.
 * Attaches the authenticated User instance (excluding the password) to req.user.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function callback
 * @returns {Object|void} Sends 401 response on authentication failure, or calls next()
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Extract the token from the Authorization header (Format: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Check if the token was provided
  if (!token) {
    return errorResponse(res, 'No token provided, access denied', 401);
  }

  try {
    // 3. Verify the token using the system secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // 4. Retrieve the user associated with the token (exclude the password)
    const user = await User.findById(decoded.id).select('-password');

    // 5. If the user no longer exists, reject the request
    if (!user) {
      return errorResponse(res, 'User belonging to this token no longer exists', 401);
    }

    // 6. Attach the user object to the request context
    req.user = user;
    next();
  } catch (error) {
    // Handle token expiration specifically
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Token has expired, please login again', 401);
    }
    // Handle invalid token (tampered, malformed, or wrong secret)
    return errorResponse(res, 'Token is invalid', 401);
  }
};

export default protect;
