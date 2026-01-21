const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('../pos-backend/config/db');
const authRoutes = require('../pos-backend/routes/authRoutes');
const errorHandler = require('../pos-backend/middleware/errorHandler');

// Load environment variables from pos-backend/.env
dotenv.config({ path: path.join(__dirname, '../pos-backend/.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database (cached for serverless)
let isConnected = false;
const ensureDbConnection = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Routes
app.use('/api/auth', authRoutes);

// Error handler
app.use(errorHandler);

// Export handler for Vercel
module.exports = async (req, res) => {
  await ensureDbConnection();
  return app(req, res);
};
