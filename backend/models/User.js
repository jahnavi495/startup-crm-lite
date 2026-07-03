import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Mongoose Schema for the User model.
 * Defines structure, constraints, and validation for user accounts.
 * 
 * @type {mongoose.Schema}
 */
export const UserSchema = new mongoose.Schema(
  {
    /**
     * The user's full name.
     * Must be between 2 and 50 characters, trimmed.
     */
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long.'],
      maxlength: [50, 'Name cannot exceed 50 characters.'],
    },
    /**
     * The user's unique login email address.
     * Normalized to lowercase, trimmed, and validated against standard email format pattern.
     */
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          // Standard RFC 5322 email regex check
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Email must be a valid email address.',
      },
    },
    /**
     * The user's hashed password credential.
     * Hashed using bcryptjs, requires at least 6 characters.
     */
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters long.'],
    },
    /**
     * The user's application authorization role.
     * Must be either 'admin' or 'user'. Defaults to 'user'.
     */
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: "Role must be either 'admin' or 'user'.",
      },
      default: 'user',
    },
    /**
     * Indicates whether the user account is active.
     * Deactivated users (isActive: false) are blocked from login.
     */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save middleware hook to hash user passwords.
 * Hashes the password using bcryptjs (10 rounds) whenever it is created or modified.
 */
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compares a plain text candidate password with the user's stored hashed password.
 * 
 * @param {string} candidatePassword - The plain text password to compare
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Overrides the default serialization method to remove sensitive password data from JSON outputs.
 * 
 * @returns {Object} User document object without password
 */
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

/**
 * The User Model compiled from the UserSchema.
 * 
 * @type {mongoose.Model}
 */
export const User = mongoose.model('User', UserSchema);

export default User;
