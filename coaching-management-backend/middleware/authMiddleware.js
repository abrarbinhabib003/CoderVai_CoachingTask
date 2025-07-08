const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();


exports.protect = async (req, res, next) => {
  try {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        message: 'No token provided, authorization denied' 
      });
    }

    // Verify 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

 
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true }
    });

    if (!admin) {
      return res.status(401).json({ 
        message: 'Token is invalid, admin no longer exists' 
      });
    }

    
    req.admin = admin;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

