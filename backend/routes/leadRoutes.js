import express from 'express';
import { body } from 'express-validator';
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
} from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Apply auth protection middleware to all lead endpoints below
router.use(protect);

router
  .route('/')
  .get(getLeads)
  .post(
    [
      body('name').trim().notEmpty().withMessage('Contact name is required.'),
      body('company').trim().notEmpty().withMessage('Company name is required.'),
      body('email').isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
      body('phone').optional().trim(),
      body('value').optional().isNumeric().withMessage('Value must be a number.'),
      body('status')
        .optional()
        .isIn(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'])
        .withMessage('Status stage is invalid.'),
      body('source')
        .optional()
        .isIn(['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'])
        .withMessage('Source channel is invalid.'),
      body('notes').optional().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters.'),
      validate,
    ],
    createLead
  );

router
  .route('/:id')
  .get(getLead)
  .put(
    [
      body('name').optional().trim().notEmpty().withMessage('Contact name cannot be empty.'),
      body('company').optional().trim().notEmpty().withMessage('Company name cannot be empty.'),
      body('email').optional().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
      body('phone').optional().trim(),
      body('value').optional().isNumeric().withMessage('Value must be a number.'),
      body('status')
        .optional()
        .isIn(['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'])
        .withMessage('Status stage is invalid.'),
      body('source')
        .optional()
        .isIn(['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'])
        .withMessage('Source channel is invalid.'),
      body('notes').optional().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters.'),
      validate,
    ],
    updateLead
  )
  .delete(deleteLead);

export default router;
