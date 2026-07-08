import { errorResponse } from '../utils/apiResponse.js';

/**
 * Global Express centralized error handling middleware.
 * Formats errors for Mongoose validation checks, database casting, duplicate key constraints,
 * and JWT validation issues into consistent API responses.
 * 
 * @param {Object} err - Error object thrown in application logic
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function callback
 * @returns {Object} Express response object containing formatted error payload
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Server error';
  let errors = null;

  // 1. Mongoose ValidationError (validation failed for schema fields)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Check Failed';
    // Format error messages field-by-field
    errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
  }

  // 2. Mongoose CastError (invalid ObjectId format)
  else if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // 3. MongoDB duplicate key error (code 11000)
  else if (err.code === 11000) {
    statusCode = 409;
    message = 'Email already exists';
    // Extract key details if available
    if (err.keyValue) {
      errors = err.keyValue;
    }
  }

  // 4. JWT Verification Errors
  else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = err.name === 'TokenExpiredError' 
      ? 'Authentication token expired' 
      : 'Authentication token is invalid';
  }

  // Log full error object in console for developer debugging in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error details caught by errorHandler:', err);
  }

  // Assemble final JSON response payload
  const responsePayload = {
    success: false,
    message,
  };

  if (errors !== null) {
    responsePayload.errors = errors;
  }

  // Conditionally append stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    responsePayload.stack = err.stack;
  }

  return res.status(statusCode).json(responsePayload);
};

export default errorHandler;
