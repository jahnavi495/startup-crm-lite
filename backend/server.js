import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables from .env file
dotenv.config();

/**
 * Validates that all critical configuration variables are present on startup.
 * Exits immediately if any required keys are missing.
 */
const checkRequiredEnvVars = () => {
  const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(
      `[CRITICAL ERROR] The server failed to start due to missing environment configurations: ${missingVars.join(', ')}`
    );
    process.exit(1);
  }
};

// Execute environment variable checks before starting database or binding ports
checkRequiredEnvVars();

// Initialize the Express Application instance
const app = express();

// --- Production Security & Optimization Middlewares ---

// 1. Helmet: Sets secure HTTP headers to prevent common vulnerabilities (XSS, clickjacking, etc.)
app.use(helmet());

// 2. Request Logging: Output combined details in production and concise logs in development
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// 3. CORS Configuration: Dynamic origin validation against whitelisted domains
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://your-app.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean); // Filters out any undefined/empty environment strings

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, postman, or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// 4. Rate Limiting: Prevent Brute-force and Denial of Service (DoS) attacks
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Strict limit: 10 authentication attempts per window
  message: 'Too many auth attempts.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limits to APIs
app.use('/api/', generalLimiter);
app.use('/api/auth/', authLimiter);

// 5. Body Parsers: Parse payloads with safety constraints
app.use(express.json({ limit: '10kb' })); // Limit JSON payloads to 10kb
app.use(express.urlencoded({ extended: true }));

// 6. MongoDB Injection Protection: Strips keys prefixed with '$' or containing '.' from requests
app.use(mongoSanitize());

// --- API Route Definitions ---

// Health Check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
  });
});

// Mount modular sub-routers
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Startup CRM Lite API.',
    documentation: 'See API endpoints for authentication (/api/auth) and leads (/api/leads).',
  });
});

// --- Centralized Error Handling ---
// Must be registered after all routers
app.use(errorHandler);

// --- Server Startup & Lifecycle Initialization ---
const PORT = process.env.PORT || 5000;

// Connect to Database, then start listening for requests
let server;
connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}).catch((error) => {
  console.error(`Failed to initialize database: ${error.message}`);
  process.exit(1);
});

/**
 * Triggers a graceful shutdown of the server.
 * Closes the HTTP server to new connections, closes the MongoDB connection, and exits.
 * 
 * @param {string} signal - Trigger signal name (SIGINT or SIGTERM)
 */
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown of Startup CRM Lite backend...`);
  
  if (server) {
    server.close(async () => {
      console.log('Express HTTP server closed.');
      try {
        await mongoose.connection.close();
        console.log('MongoDB Atlas connection closed cleanly.');
        console.log('Server shutting down gracefully.');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection during shutdown:', err);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }

  // Force close process after 10 seconds if shutdown hangs
  setTimeout(() => {
    console.error('Forceful shutdown triggered. Graceful shutdown timed out.');
    process.exit(1);
  }, 10000);
};

// Register signals listeners for process terminations
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
