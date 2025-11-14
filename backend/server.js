const express = require('express');
const cors = require('cors');
const db = require('./db');
const { CREDENTIALS, generateToken, verifyToken } = require('./auth');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    const token = generateToken(username);
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to dashboard, ${req.user.username}!` });
});

app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT 1 as test');
    res.json({ message: 'Database connected', data: rows });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});