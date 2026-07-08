import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Mongoose Schema for the User model.
 * Defines structure, validations, and options for user account records.
 * 
 * @type {mongoose.Schema}
 */
export const UserSchema = new mongoose.Schema(
  {
    /**
     * The full name of the user.
     * Required field, trimmed of whitespace, must be between 2 and 50 characters long.
     */
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minLength: [2, 'Name must be at least 2 characters long.'],
      maxLength: [50, 'Name cannot exceed 50 characters.'],
    },
    /**
     * The unique login email address for the user.
     * Required, converted to lowercase, trimmed, and validated against standard email format pattern.
     */
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
      lowercase: true,
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
     * The password credential used for authentication.
     * Required, minimum length of 6 characters before hashing.
     * This field stores the hashed password and is omitted from default JSON outputs.
     */
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minLength: [6, 'Password must be at least 6 characters long.'],
    },
    /**
     * The system role determining user access authorization.
     * Enforced by enum values ['admin', 'user'], defaulting to 'user'.
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
     * Inactive users are blocked from logging in. Defaults to true.
     */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
);

/**
 * Pre-save middleware hook to hash the user's password.
 * If the password field was modified or is newly created, hashes it using bcryptjs with 10 salt rounds.
 */
UserSchema.pre('save', async function () {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.error('Error in password hashing pre-save hook:', error);
    throw error;
  }
});

/**
 * Compares a plain text candidate password with the user's stored hashed password.
 * 
 * @param {string} candidatePassword - The plain text password to compare.
 * @returns {Promise<boolean>} Resolves to true if passwords match, or false otherwise.
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Overrides the default toJSON serialization method.
 * Deletes the password field from the returned object to ensure sensitive data is not leaked.
 * 
 * @returns {Object} Plain JavaScript object representation of the user document without the password.
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
