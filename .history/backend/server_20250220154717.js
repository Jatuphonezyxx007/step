// backend/server.js

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ เสิร์ฟไฟล์รูปภาพจากโฟลเดอร์ uploads
app.use('/images/categories', express.static(path.join(__dirname, 'uploads/categories')));
app.use('/images/products', express.static(path.join(__dirname, 'uploads/products')));

// MySQL connection pool
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

// API: Get category info
app.get('/api/category/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT id, name, img_cate FROM categories WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category.', error });
  }
});

// API: Get products by category with image details
app.get('/api/products/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.name, p.price, p.status, pi.file_name AS image_filename, pi.file_extension
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id
       WHERE p.category_id = ?`,
      [categoryId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products.', error });
  }
});

// 🚀 Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
