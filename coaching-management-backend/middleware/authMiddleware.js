const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();


const authMiddleware = async (req, res, next) => {
  try {
    console.log('Auth middleware: Checking authentication...');
    
    //  token from HTTP-only cookie
    let token = req.cookies?.authToken;
    
  
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token found in Authorization header (fallback)');
    }

    if (!token) {
      console.log('No authentication token found');
      return res.status(401).json({ 
        success: false,
        error: 'No token provided, authorization denied' 
      });
    }

 

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified for user ID:', decoded.id);

 
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { 
        id: true, 
        username: true, 
        name: true, 
        email: true 
      }
    });

    if (!admin) {
      console.log(' Admin not found for token');
      return res.status(401).json({ 
        success: false,
        error: 'Token is invalid, admin no longer exists' 
      });
    }

    console.log('Admin authenticated:', admin.username);

  
    req.user = admin; 
    next();
  } catch (err) {
    console.error(' Auth middleware error:', err);
    
    if (err.name === 'JsonWebTokenError') {
      console.log(' Invalid token format');
      return res.status(401).json({ 
        success: false,
        error: 'Invalid token' 
      });
    } else if (err.name === 'TokenExpiredError') {
      console.log(' Token has expired');
      return res.status(401).json({ 
        success: false,
        error: 'Token expired' 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      error: 'Token verification failed' 
    });
  }
};

// for development level- logs request details
const logRequest = (req, res, next) => {
  console.log(` ${req.method} ${req.path} - ${new Date().toISOString()}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(' Request body:', req.body);
  }
  if (req.query && Object.keys(req.query).length > 0) {
    console.log(' Query params:', req.query);
  }
  next();
};

module.exports = {
  protect: authMiddleware,
  logRequest: logRequest
};