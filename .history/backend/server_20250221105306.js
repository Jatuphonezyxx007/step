// backend/server.js

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// ✅ กำหนด CORS เพื่อรองรับ Production และ Localhost
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ เสิร์ฟไฟล์รูปภาพจากโฟลเดอร์ uploads
app.use('/images/categories', express.static(path.join(__dirname, 'uploads/categories')));
app.use('/images/products', express.static(path.join(__dirname, 'uploads/products')));

// ✅ การตั้งค่าการเชื่อมต่อฐานข้อมูลแบบ Connection Pool
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

// ✅ API: ดึงข้อมูลหมวดหมู่ตาม ID (ปรับเพิ่ม console.log เพื่อตรวจสอบข้อมูล)
app.get('/api/category/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📌 รับค่า categoryId: ${id}`); // ✅ DEBUG
  try {
    const [rows] = await pool.query(
      'SELECT id, name, CONCAT("/images/categories/", img_cate) AS img_cate FROM categories WHERE id = ?',
      [id]
    );
    console.log(`📦 ข้อมูลหมวดหมู่ที่พบ:`, rows); // ✅ DEBUG
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Category not found.' });
    }
  } catch (error) {
    console.error('❌ Error fetching category:', error);
    res.status(500).json({ message: 'Failed to fetch category.', error });
  }
});

// ✅ API: ดึงข้อมูลสินค้าตามหมวดหมู่ (เพิ่ม console.log สำหรับ Debug)
app.get('/api/products/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  console.log(`📌 รับค่า categoryId สำหรับสินค้า: ${categoryId}`); // ✅ DEBUG
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.name, p.price, p.status, 
              IFNULL(CONCAT('/images/products/', pi.image_path), '/images/products/default.png') AS image_path
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_main = 1
       WHERE p.category_id = ?`,
      [categoryId]
    );
    console.log(`📦 สินค้าที่พบ:`, rows); // ✅ DEBUG
    res.json(rows);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products.', error });
  }
});

// 🚀 เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});