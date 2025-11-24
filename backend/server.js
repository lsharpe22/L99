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

app.get('/api/chart-data', verifyToken, async (req, res) => {
  try {
    console.log('Fetching chart data...');
    const [rows] = await db.execute(`
      SELECT 
        innovation_type,
        COUNT(*) as count
      FROM ai_innovations 
      WHERE release_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY innovation_type
      ORDER BY count DESC
    `);
    console.log('Chart data result:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Chart data error:', error);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT 1 as test');
    res.json({ message: 'Database connected', data: rows });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.get('/api/test-data', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM ai_innovations LIMIT 5');
    res.json({ message: 'Sample data', data: rows });
  } catch (error) {
    console.error('Test data error:', error);
    res.status(500).json({ error: 'Failed to fetch test data', details: error.message });
  }
});

app.get('/api/trends-data', verifyToken, async (req, res) => {
  try {
    console.log('Fetching trends data...');
    const [rows] = await db.execute(`
      SELECT 
        month_year,
        total_releases,
        major_updates,
        new_models
      FROM ai_monthly_trends 
      ORDER BY month_year ASC
    `);
    console.log('Trends data result:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Trends data error:', error);
    res.status(500).json({ error: 'Failed to fetch trends data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});