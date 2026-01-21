const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../../pos-backend/config/db');
const { login } = require('../../pos-backend/controllers/authController');

dotenv.config({ path: require('path').join(__dirname, '../../pos-backend/.env') });

const app = express();
app.use(cors());
app.use(express.json());

let isConnected = false;

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }
    
    if (req.method === 'POST') {
      return login(req, res, (error) => {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
      });
    }
    
    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Function error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
