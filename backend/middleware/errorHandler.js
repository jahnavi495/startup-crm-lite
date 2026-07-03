import { errorResponse } from '../utils/apiResponse.js';

/**
 * Global centralized Express error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Log the stack trace in development mode
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack || err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // 1. Mongoose Bad ObjectId CastError
  if (err.name === 'CastError') {
    statusCode = 404;
    message = `Resource not found with ID: ${err.value}`;
  }

  // 2. Mongoose Duplicate Key Error (e.g. unique field breach)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate database field value entered. A record with this value already exists.';
    // Extract key details
    if (err.keyValue) {
      errors = Object.keys(err.keyValue).map((key) => ({
        field: key,
        message: `Value '${err.keyValue[key]}' is already in use.`,
      }));
    }
  }

  // 3. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Database validation check failed.';
    errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }));
  }

  // 4. JWT JsonWebTokenError
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Authentication token verification failed. Access denied.';
  }

  // 5. JWT TokenExpiredError
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired. Please re-authenticate.';
  }

  return errorResponse(res, message, statusCode, errors);
};
