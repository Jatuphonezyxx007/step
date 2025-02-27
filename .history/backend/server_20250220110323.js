// backend/server.js

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Create a reusable MySQL connection pool
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'website',
};

let pool;
(async function initializeDB() {
  try {
    pool = await mysql.createPool(dbConfig);
    console.log('✅ MySQL Database Connected Successfully.');
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
  }
})();

// Generic function to fetch data from any table
async function fetchTableData(tableName) {
  const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
  return rows;
}

// API Endpoint: Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await fetchTableData('categories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories.', error });
  }
});

// Example API Endpoint: Get all products (future use)
app.get('/api/products', async (req, res) => {
  try {
    const products = await fetchTableData('products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products.', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
