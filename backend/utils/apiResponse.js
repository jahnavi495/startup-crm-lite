/**
 * Standard API response helper utilities for the Startup CRM Lite backend.
 * Provides consistent response formats for success, error, and paginated states.
 */

/**
 * Sends a successful API response.
 * Standard Signature: successResponse(res, data, message, statusCode = 200)
 * 
 * Supports backward-compatibility for: successResponse(res, message, data, statusCode)
 * 
 * @param {Object} res - Express response object
 * @param {*} data - Payload data or message string (if backward compatible)
 * @param {string|*} [message] - Description message or payload data (if backward compatible)
 * @param {number} [statusCode=200] - HTTP status code
 * @returns {Object} Express response object
 */
export const successResponse = (res, data, message, statusCode = 200) => {
  let finalData = data;
  let finalMessage = message;
  let finalStatus = statusCode;

  // Detect backward-compatible parameter usage where 'data' is the message string
  if (typeof data === 'string') {
    finalMessage = data;
    finalData = message;
    if (typeof finalData === 'number') {
      finalStatus = finalData;
      finalData = null;
    }
  }

  return res.status(finalStatus).json({
    success: true,
    message: finalMessage,
    data: finalData,
  });
};

/**
 * Sends an error API response.
 * Signature: errorResponse(res, message, statusCode = 500, errors = null)
 * 
 * @param {Object} res - Express response object
 * @param {string} message - Error description message
 * @param {number} [statusCode=500] - HTTP status code
 * @param {Array|Object|null} [errors=null] - Detailed validation or field-level errors
 * @returns {Object} Express response object
 */
export const errorResponse = (res, message, statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * Sends a paginated API response.
 * Signature: paginatedResponse(res, data, total, page, limit)
 * 
 * @param {Object} res - Express response object
 * @param {Array} data - Paginated list of records
 * @param {number} total - Total count of records matching criteria
 * @param {number} page - Current page number (1-indexed)
 * @param {number} limit - Maximum number of records per page
 * @returns {Object} Express response object
 */
export const paginatedResponse = (res, data, total, page, limit) => {
  const totalRecords = Number(total);
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const pages = limitNum > 0 ? Math.ceil(totalRecords / limitNum) : 0;

  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total: totalRecords,
      page: pageNum,
      limit: limitNum,
      pages,
      hasNext: pageNum < pages,
      hasPrev: pageNum > 1,
    },
  });
};
