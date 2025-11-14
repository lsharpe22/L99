const jwt = require('jsonwebtoken');

// Hardcoded credentials (first name as both login and password)
const CREDENTIALS = {
  username: 'lauren',
  password: 'lauren'
};

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { CREDENTIALS, generateToken, verifyToken };