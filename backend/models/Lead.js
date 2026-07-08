import mongoose from 'mongoose';

/**
 * Mongoose Schema for the Lead model.
 * Defines structure, validations, virtual fields, and indexes for CRM lead tracking.
 * 
 * @type {mongoose.Schema}
 */
export const LeadSchema = new mongoose.Schema(
  {
    /**
     * The name of the primary contact person for the lead.
     * Required field, trimmed, must be between 2 and 100 characters long.
     */
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters long.'],
      maxLength: [100, 'Name cannot exceed 100 characters.'],
    },
    /**
     * The company or organization name associated with the lead.
     * Required field, trimmed.
     */
    company: {
      type: String,
      required: [true, 'Company is required.'],
      trim: true,
    },
    /**
     * The contact email address for the lead.
     * Required field, trimmed, and validated against standard email format.
     */
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      validate: {
        validator: function (v) {
          // Regular expression to validate standard email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Email must be a valid email address.',
      },
    },
    /**
     * The contact phone number for the lead.
     * Optional field, trimmed.
     */
    phone: {
      type: String,
      trim: true,
    },
    /**
     * The estimated monetary value (deal size) of the lead.
     * Optional field, defaults to 0. Retained to preserve integration with 
     * analytics charts and pipeline overview calculations.
     */
    value: {
      type: Number,
      default: 0,
    },
    /**
     * The current lifecycle status stage of the lead.
     * Enforced by enum values to align precisely with frontend constants.
     * Defaults to 'New'.
     */
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'],
        message: 'Status must be one of: New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost.',
      },
      default: 'New',
    },
    /**
     * The acquisition source where the lead originated.
     * Enforced by enum values to align precisely with frontend constants.
     * Defaults to 'Website'.
     */
    source: {
      type: String,
      enum: {
        values: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'],
        message: 'Source must be one of: Website, Referral, LinkedIn, Cold Call, Email Campaign, Other.',
      },
      default: 'Website',
    },
    /**
     * Additional notes, details, or descriptions from communication logs.
     * Optional field, maximum length of 1000 characters.
     */
    notes: {
      type: String,
      maxLength: [1000, 'Notes cannot exceed 1000 characters.'],
    },
    /**
     * The user ID of the owner who created and manages this lead.
     * Required reference pointing to the User model.
     */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required.'],
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
    // Enable virtual fields to be included in JSON and object serialization
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// --- Indexes ---

// Compound index on (owner, status) for fast filtered queries in the sales pipeline
LeadSchema.index({ owner: 1, status: 1 });

// Index on email for fast contact/lead lookups
LeadSchema.index({ email: 1 });

// Compound indexes for pagination and chronologically sorted queries
LeadSchema.index({ owner: 1, createdAt: -1 });
LeadSchema.index({ owner: 1, status: 1, createdAt: -1 });
LeadSchema.index({ owner: 1, source: 1, createdAt: -1 });

// --- Virtual Fields ---

/**
 * Virtual field 'age' calculating the number of days since the lead was created.
 * Useful for pipeline stagnation analytics.
 * 
 * @name age
 * @type {number}
 */
LeadSchema.virtual('age').get(function () {
  if (!this.createdAt) {
    return 0;
  }
  const differenceInMs = Date.now() - new Date(this.createdAt).getTime();
  // Convert milliseconds to full days
  return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
});

/**
 * The Lead Model compiled from the LeadSchema.
 * 
 * @type {mongoose.Model}
 */
export const Lead = mongoose.model('Lead', LeadSchema);

export default Lead;
