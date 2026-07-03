import mongoose from 'mongoose';

/**
 * Mongoose Schema for the Lead model.
 * Captures lifecycle stages, origins, notes, and user associations for CRM leads.
 * 
 * @type {mongoose.Schema}
 */
export const LeadSchema = new mongoose.Schema(
  {
    /**
     * The primary contact person's name.
     * Required, trimmed, between 2 and 100 characters.
     */
    name: {
      type: String,
      required: [true, 'Contact name is required.'],
      trim: true,
      minlength: [2, 'Contact name must be at least 2 characters long.'],
      maxlength: [100, 'Contact name cannot exceed 100 characters.'],
    },
    /**
     * The organization or company associated with the lead.
     * Required and trimmed.
     */
    company: {
      type: String,
      required: [true, 'Company name is required.'],
      trim: true,
    },
    /**
     * The primary email address for contacting the lead.
     * Required, trimmed, and validated against standard email structure pattern.
     */
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Email must be a valid email address.',
      },
    },
    /**
     * The telephone or mobile number for contacting the lead.
     * Optional and trimmed.
     */
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    /**
     * The value estimate for the lead in the pipeline (opportunity size).
     * Defaults to 0.
     */
    value: {
      type: Number,
      default: 0,
    },
    /**
     * The stage status of the lead in the sales pipeline.
     * Enforced by enum values to align precisely with frontend constants.
     */
    status: {
      type: String,
      required: [true, 'Status stage is required.'],
      enum: {
        values: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'],
        message: 'Status must be one of: New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost.',
      },
      default: 'New',
    },
    /**
     * The origin source channel where the lead was generated.
     * Enforced by enum values to align precisely with frontend constants.
     */
    source: {
      type: String,
      required: [true, 'Source channel is required.'],
      enum: {
        values: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'],
        message: 'Source must be one of: Website, Referral, LinkedIn, Cold Call, Email Campaign, Other.',
      },
      default: 'Website',
    },
    /**
     * Additional notes or descriptions about the lead interactions.
     * Optional, up to 1000 characters.
     */
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters.'],
      default: '',
    },
    /**
     * The owner who created and manages the lead.
     * Links back to the User model, required.
     */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Lead owner is required.'],
    },
  },
  {
    timestamps: true,
    // Enable virtual fields to be included in JSON and object serialization
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// --- Indexes ---

// Compound index on owner and status for optimized pipeline listing and stage-based filtering
LeadSchema.index({ owner: 1, status: 1 });

// Single-field index on email for optimized search and contact lookups
LeadSchema.index({ email: 1 });

// --- Virtuals ---

/**
 * Virtual field 'age' calculating the number of days since the lead creation timestamp.
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
