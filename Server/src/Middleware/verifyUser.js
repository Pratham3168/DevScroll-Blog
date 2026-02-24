const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Try cookie token first, then Authorization header (Bearer)
    let token = null;
    if (req.cookies && req.cookies.token) token = req.cookies.token;
    else if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') token = parts[1];
    }

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    });
};

module.exports = { verifyToken };