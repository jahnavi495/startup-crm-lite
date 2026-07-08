import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Force DNS resolution to Google's public DNS to resolve MongoDB Atlas SRV/TXT records.
// This prevents querySrv ECONNREFUSED resolution issues on Windows/VPN environments.
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Load environment variables
dotenv.config();

/**
 * Connect to MongoDB Atlas
 * Logs success host on connection, or logs error and exits on failure.
 * 
 * @returns {Promise<void>} Resolves when connection is successful
 */
export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('Error: MONGODB_URI environment variable is missing.');
      process.exit(1);
    }

    let conn;
    try {
      // Attempt to connect with the requested options
      conn = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (optError) {
      // Fallback if the active Mongoose version does not support these legacy options
      if (optError.message && (optError.message.includes('not supported') || optError.message.includes('option'))) {
        conn = await mongoose.connect(mongoURI);
      } else {
        throw optError;
      }
    }

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
