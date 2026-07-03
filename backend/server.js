import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
// 1. Parse JSON body payloads
app.use(express.json());

// 2. Parse URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// 3. Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// 4. Secure app by setting various HTTP headers
app.use(helmet());

// 5. Logging HTTP requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Routes Hookup
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Startup CRM Lite API.',
    documentation: 'See API endpoints for authentication (/api/auth) and leads (/api/leads).',
  });
});

// Centralized Error Handler (Must be registered after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}.`
  );
});

// Handle unhandled promise rejections (e.g. database connection failure)
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
