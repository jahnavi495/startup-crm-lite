import express from 'express';
import { body } from 'express-validator';
import {
  getLeads,
  createLead,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
  getMonthlyStats,
  getQuickSearch,
} from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Apply auth protection middleware to ALL routes in this file
router.use(protect);

/**
 * Validation rules for creating a lead record
 */
const createLeadValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters.'),
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company is required.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'])
    .withMessage('Status must be one of: New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost.'),
  body('source')
    .optional()
    .isIn(['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'])
    .withMessage('Source must be one of: Website, Referral, LinkedIn, Cold Call, Email Campaign, Other.'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters.'),
];

/**
 * Validation rules for updating an existing lead record
 */
const updateLeadValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters.'),
  body('company')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company cannot be empty.'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim(),
  body('status')
    .optional()
    .isIn(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'])
    .withMessage('Status must be one of: New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost.'),
  body('source')
    .optional()
    .isIn(['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'])
    .withMessage('Source must be one of: Website, Referral, LinkedIn, Cold Call, Email Campaign, Other.'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters.'),
];

/**
 * Validation rules for updating lead status specifically
 */
const updateStatusValidation = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required.')
    .isIn(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'])
    .withMessage('Status must be one of: New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost.'),
];

// --- Endpoint Routing Declarations ---
// CRITICAL: Mount static paths BEFORE parameterized paths to prevent collision/wrong matching.

// Endpoint 1: Retrieve cumulative sales opportunity pipeline aggregates and conversion rate (Private)
router.get('/stats/summary', getLeadStats);
router.get('/stats', getLeadStats);

// Endpoint 2: Retrieve monthly grouped leads breakdown for the last six calendar months (Private)
router.get('/stats/monthly', getMonthlyStats);
router.get('/monthly-stats', getMonthlyStats);

// Endpoint 3 & 4: Retrieve paginated search-filtered list of leads / Create a new lead (Private)
router.route('/')
  .get(getLeads)
  .post(validate(createLeadValidation), createLead);

// Endpoint 5: Autocomplete leads search (Private)
router.get('/search', getQuickSearch);

// Endpoint 6, 7 & 8: Fetch details / modify fields / delete specific lead ID record (Private)
router.route('/:id')
  .get(getLeadById)
  .put(validate(updateLeadValidation), updateLead)
  .delete(deleteLead);

// Endpoint 8: Update only status stage of a specific lead ID record (Private)
router.patch('/:id/status', validate(updateStatusValidation), updateLeadStatus);

export default router;
