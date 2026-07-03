import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/apiResponse.js';

/**
 * Middleware to protect routes against unauthenticated requests
 */
export const protect = async (req, res, next) => {
  let token;

  // Retrieve token from Authorization header (Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized to access this route. Token is missing.', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    // Retrieve user and attach to request context (exclude password)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return errorResponse(res, 'No user found with the ID provided in the token.', 404);
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Not authorized to access this route. Token is invalid or expired.', 401);
  }
};
