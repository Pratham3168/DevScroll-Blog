const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Try cookie token first, then Authorization header (Bearer)
    let token = null;
    
    // Debug logging (remove in production after testing)
    const debugInfo = {
      hasCookies: !!req.cookies,
      cookieKeys: req.cookies ? Object.keys(req.cookies) : [],
      hasAuthHeader: !!req.headers.authorization,
      hasTokenCookie: !!(req.cookies && req.cookies.token),
    };

    console.log('🔍 Auth Debug:', {
      ...debugInfo,
      cookieValue: req.cookies?.token ? `${req.cookies.token.substring(0, 20)}...` : 'none',
    });

    // Check cookies first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('✅ Token found in cookies');
    } 
    // Fallback: check Authorization header
    else if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
          console.log('✅ Token found in Authorization header');
        }
    }

    if (!token) {
      console.error('❌ No token found:', {
        cookies: req.cookies,
        authorization: req.headers.authorization,
      });
      return res.status(401).json({ message: 'Unauthorized - no token found' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.error('❌ Token verification failed:', err.message);
          return res.status(401).json({ message: 'Unauthorized - invalid token' });
        }
        console.log('✅ Token verified for user:', user.id);
        req.user = user;
        next();
    });
};

module.exports = { verifyToken };module.exports = { verifyToken };