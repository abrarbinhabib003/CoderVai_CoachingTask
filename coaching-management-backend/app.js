const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { logRequest } = require('./middleware/authMiddleware');


dotenv.config();

console.log('Starting The Server...');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Frontend URL:', process.env.FRONTEND_URL || 'http://localhost:5173');

// routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const batchRoutes = require('./routes/batchRoutes');


//  Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Middleware used successfully');

// development level logging test
if (process.env.NODE_ENV === 'development') {
  app.use(logRequest);
}

//  route checking
app.get('/', (req, res) => {
  res.json({
    message: 'Backend is Running!',
    
  });
});

//  Routes
app.use('/api/students', studentRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/auth', authRoutes);


//  404 routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    availableRoutes: {
      auth: '/api/auth (POST /login, POST /register, GET /profile)',
      students: '/api/students (GET, POST, PUT, DELETE)',
      batches: '/api/batches (GET, POST)',
      attendance: '/api/attendance (GET, POST, PUT, DELETE)',
      notices: '/api/notices (GET, POST, PUT, DELETE)'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
