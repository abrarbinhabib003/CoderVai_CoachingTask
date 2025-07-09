const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();


exports.register = async (req, res) => {
  const { username, password, name, email } = req.body;
  
  try {
    console.log(' Registration attempt for username:', username);
    
   
    const existingAdminCount = await prisma.admin.count();
    console.log(' Current admin count:', existingAdminCount);
    
    if (existingAdminCount > 0) {
      console.log('Registration rejected: Admin already exists');
      return res.status(400).json({ 
        success: false,
        error: 'Admin registration is closed. Only one admin is allowed.' 
      });
    }

    // Validate required 
    if (!username || !password) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: 'Username and password are required' 
      });
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new admin
    console.log('Creating new admin...');
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        name: name || username,
        email: email || `${username}@smartccm.com`
      }
    });

    console.log('Admin created successfully:', { id: admin.id, username: admin.username });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('JWT token generated for admin:', admin.id);

    // Set HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    console.log('HTTP-only cookie set :', admin.username);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error during registration' 
    });
  }
};

// Login admin
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    console.log('🔐 Login attempt for username:', username);
    
    // Validate required fields
    if (!username || !password) {
      console.log(' Login failed: Missing credentials');
      return res.status(400).json({ 
        success: false,
        error: 'Username and password are required' 
      });
    }
    
    // Find admin by username
    console.log(' Searching for admin with username:', username);
    const admin = await prisma.admin.findUnique({ 
      where: { username } 
    });

    if (!admin) {
      console.log('Login failed: Admin not found');
      return res.status(401).json({ 
        success: false,
        error: 'Invalid username or password' 
      });
    }

    console.log('👤 Admin found:', { id: admin.id, username: admin.username });

    // Check pass
    console.log('Verifying password...');
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ 
        success: false,
        error: 'Invalid username or password' 
      });
    }

    console.log('Password verified successfully');

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    console.log('🎫 JWT token generated for admin:', admin.id);

    // Set HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    console.log('HTTP-only cookie set for admin:', admin.username);

    res.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error during login' 
    });
  }
};

// profile
exports.getProfile = async (req, res) => {
  try {
    console.log('👤 Profile request for admin ID:', req.user.id);
    
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
      select: { 
        id: true, 
        username: true, 
        name: true, 
        email: true,
        createdAt: true
      }
    });

    if (!admin) {
      console.log('Profile fetch failed: Admin not found');
      return res.status(404).json({ 
        success: false,
        error: 'Admin not found' 
      });
    }

    console.log('Profile fetched successfully for:', admin.username);

    res.json({
      success: true,
      admin
    });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error fetching profile' 
    });
  }
};

// Logout 
exports.logout = async (req, res) => {
  try {
    console.log('Logout request for admin ID:', req.user.id);
    
    // Clear HTTP-only cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    console.log('HTTP-only cookie cleared, admin logged out');

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server error during logout' 
    });
  }
};