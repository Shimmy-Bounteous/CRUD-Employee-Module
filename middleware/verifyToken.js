const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    // extract authorization headers from request
    const authHeader = req.headers['authorization'];
    // getting token from auth headers if auth headers
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Missing Token' })
    }

    // verify token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ succes: false, message: 'Invalid Token' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = { verifyToken };