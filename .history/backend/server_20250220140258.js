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

// Fetch all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, img_cate FROM categories');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories.', error });
  }
});

// Fetch specific category by ID
app.get('/api/category/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT id, name, img_cate FROM categories WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Category not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category.', error });
  }
});

// Fetch products by category ID (with details)
app.get('/api/products/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.name, p.price, p.status, p.description, pd.screen_size, pd.resolution, pd.brightness,
              pd.connectivity, pd.operating_system
       FROM products p
       LEFT JOIN product_details pd ON p.id = pd.product_id
       WHERE p.category_id = ?`,
      [categoryId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products.', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
