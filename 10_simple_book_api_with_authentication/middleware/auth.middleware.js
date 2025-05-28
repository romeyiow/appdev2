// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer scheme)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user; 

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Token verification failed:', error.message);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Not authorized, token expired' });
            }
            return res.status(401).json({ success: false, message: 'Not authorized, general token error' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

module.exports = { protect };