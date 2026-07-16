import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables from .env file
dotenv.config();

/**
 * Seeds the default admin account if the database does not contain any user entries.
 */
const seedAdmin = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found in database. Seeding default admin user...');
      await User.create({
        name: 'CRM Admin',
        email: 'admin@crm.com',
        password: 'AdminPassword123!',
        role: 'admin',
        isActive: true,
      });
      console.log('Default admin user seeded successfully: admin@crm.com / AdminPassword123!');
    }
  } catch (error) {
    console.error('Failed to seed default admin user:', error.message);
  }
};

/**
 * Connects to MongoDB Atlas using the URI specified in process.env.MONGODB_URI.
 * Configures connection options and implements a fallback mechanism for legacy parameters
 * if they are deprecated or unsupported by the current Mongoose/MongoDB driver.
 */
export const connectDB = async () => {
  const dbURI = process.env.MONGODB_URI;
  let conn;
  let isInMemory = false;

  if (dbURI) {
    try {
      console.log('Attempting to connect to database URI...');
      conn = await mongoose.connect(dbURI, {
        dbName: 'startup_crm_lite',
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Database connection to MONGODB_URI failed: ${error.message}`);
      try {
        await mongoose.disconnect();
      } catch (discErr) {}
      console.log('Falling back to in-memory MongoDB server for local development...');
      isInMemory = true;
    }
  } else {
    console.warn('MONGODB_URI not defined. Defaulting to in-memory MongoDB...');
    isInMemory = true;
  }

  if (isInMemory) {
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      conn = await mongoose.connect(mongoUri, {
        dbName: 'startup_crm_lite',
      });
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
    } catch (inMemoryError) {
      console.error(`Failed to initialize in-memory database: ${inMemoryError.message}`);
      process.exit(1);
    }
  }

  // Seed admin if DB is empty
  await seedAdmin();
};

export default connectDB;
