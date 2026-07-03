import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/apiResponse.js';

/**
 * Middleware validation runner helper
 * Assesses validation results from express-validator and reports formatting failures
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(
      res,
      'Validation failed for this request.',
      400,
      errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      }))
    );
  }
  next();
};
