import { validationResult } from 'express-validator';

/**
 * Express middleware runner to execute express-validator checks and collect formatting errors.
 * Returns 400 with a list of field-level errors if any checks fail.
 * 
 * @param {Array<Object>} validations - Array of express-validator validation chains
 * @returns {Function} Express middleware function
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations in the array
    for (const validation of validations) {
      await validation.run(req);
    }

    // Collect validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.path || err.param,
          message: err.msg,
        })),
      });
    }

    next();
  };
};

export default validate;
