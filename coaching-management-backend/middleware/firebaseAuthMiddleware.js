const admin = require('firebase-admin');

// Initialize Firebase Admin (you'll need to set this up)
// You need to add your Firebase service account key
const serviceAccount = {
  // Add your Firebase service account credentials here
  // This should come from environment variables for security
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyFirebaseToken = async (req, res, next) => {
  try {
    console.log('Firebase Auth: Checking authentication...');
    
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No Firebase token found');
      return res.status(401).json({ 
        success: false,
        error: 'No Firebase token provided' 
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Firebase token found, verifying...');

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Firebase token verified for user:', decodedToken.uid);

    // Add user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified
    };

    next();
  } catch (error) {
    console.error('Firebase auth error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Invalid Firebase token' 
    });
  }
};

module.exports = { verifyFirebaseToken };
