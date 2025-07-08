const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

// register
exports.register = async (req, res) => {
  const { username, password } = req.body;
  
  try {
   
    const adminCount = await prisma.admin.count();
    
    if (adminCount > 0) {
      return res.status(403).json({ 
        message: 'Admin registration is closed. Only one admin account is allowed.',
        info: 'The system already has an admin account. Please use the login endpoint.'
      });
    }

  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }


    const hashedPassword = await bcrypt.hash(password, 12);


    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    //  JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'First admin registered successfully! Registration is now disabled.',
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    
   
    if (err.code === 'P2002') {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login 
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
   
    const admin = await prisma.admin.findUnique({ 
      where: { username } 
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    //  JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// profile
exports.getProfile = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, username: true }
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
};