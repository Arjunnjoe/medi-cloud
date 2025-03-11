const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Test Route
app.get('/', (req, res) => {
  res.send('Medi Cloud Backend is Running');
});

// Test Database Connection Route
app.get('/db-test', (req, res) => {
  db.query('SHOW TABLES', (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
      return;
    }
    res.json({ tables: result });
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});