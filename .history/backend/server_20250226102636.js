// // // backend/server.js
// // const express = require('express');
// // const mysql = require('mysql2/promise');
// // const cors = require('cors');
// // const path = require('path');

// // const app = express();
// // const port = process.env.PORT || 5000;

// // // ✅ กำหนด CORS เพื่อรองรับ Production และ Localhost
// // const corsOptions = {
// //   origin: '*',
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   credentials: true,
// // };
// // app.use(cors(corsOptions));
// // app.use(express.json());

// // // ✅ เสิร์ฟไฟล์รูปภาพจากโฟลเดอร์ uploads
// // app.use('/images/categories', express.static(path.join(__dirname, 'uploads/categories')));
// // app.use('/images/products', express.static(path.join(__dirname, 'uploads/products')));

// // // ✅ การตั้งค่าการเชื่อมต่อฐานข้อมูลแบบ Connection Pool
// // const dbConfig = {
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: 'website',
// // };

// // let pool;
// // (async function initializeDB() {
// //   try {
// //     pool = await mysql.createPool(dbConfig);
// //     console.log('✅ MySQL Database Connected Successfully.');
// //   } catch (error) {
// //     console.error('❌ Database Connection Failed:', error);
// //   }
// // })();

// // // ✅ API: ดึงข้อมูลหมวดหมู่ตาม ID (ปรับเพิ่ม console.log เพื่อตรวจสอบข้อมูล)
// // app.get('/api/category/:id', async (req, res) => {
// //   const { id } = req.params;
// //   console.log(`📌 รับค่า categoryId: ${id}`); // ✅ DEBUG
// //   try {
// //     const [rows] = await pool.query(
// //       'SELECT id, name, CONCAT("/images/categories/", img_cate) AS img_cate FROM categories WHERE id = ?',
// //       [id]
// //     );
// //     console.log(`📦 ข้อมูลหมวดหมู่ที่พบ:`, rows); // ✅ DEBUG
// //     if (rows.length > 0) {
// //       res.json(rows[0]);
// //     } else {
// //       res.status(404).json({ message: 'Category not found.' });
// //     }
// //   } catch (error) {
// //     console.error('❌ Error fetching category:', error);
// //     res.status(500).json({ message: 'Failed to fetch category.', error });
// //   }
// // });

// // // ✅ API: ดึงข้อมูลสินค้าตามหมวดหมู่ (เพิ่ม console.log สำหรับ Debug)
// // app.get('/api/products/category/:categoryId', async (req, res) => {
// //   const { categoryId } = req.params;
// //   console.log(`📌 รับค่า categoryId สำหรับสินค้า: ${categoryId}`); // ✅ DEBUG
// //   try {
// //     const [rows] = await pool.query(
// //       `SELECT p.id, p.name, p.price, p.status, 
// //               IFNULL(CONCAT('/images/products/', pi.image_path), '/images/products/default.png') AS image_path
// //        FROM products p
// //        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_main = 1
// //        WHERE p.category_id = ?`,
// //       [categoryId]
// //     );
// //     console.log(`📦 สินค้าที่พบ:`, rows); // ✅ DEBUG
// //     res.json(rows);
// //   } catch (error) {
// //     console.error('❌ Error fetching products:', error);
// //     res.status(500).json({ message: 'Failed to fetch products.', error });
// //   }
// // });

// // // 🚀 เริ่มต้นเซิร์ฟเวอร์
// // app.listen(port, () => {
// //   console.log(`🚀 Server running at http://localhost:${port}`);
// // });







// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();
// app.use(cors());

// // การตั้งค่าการเชื่อมต่อฐานข้อมูล
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "website",
// });

// // ทดสอบการเชื่อมต่อฐานข้อมูล
// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("Connected to the database.");
// });

// // คำสั่ง SQL สำหรับดึงข้อมูลสินค้าทั้งหมด
// const sqlProducts = `
// SELECT 
//     p.id,
//     p.name,
//     pd.installation_type,
//     pd.screen_size,
//     pd.resolution,
//     pd.brightness,
//     p.price,
//     p.status,
//     pi.image_path,
//     c.name AS category_name
// FROM 
//     products p
// INNER JOIN 
//     product_details pd ON p.id = pd.product_id
// INNER JOIN
//     categories c ON p.category_id = c.id
// LEFT JOIN 
//     product_images pi ON p.id = pi.product_id AND pi.is_main = 1
// `;

// // API สำหรับดึงข้อมูลสินค้าทั้งหมด
// app.get("/api/products", (req, res) => {
//   db.query(sqlProducts, (err, results) => {
//     if (err) {
//       console.error("Error fetching products:", err);
//       res.status(500).send("An error occurred while fetching products.");
//       return;
//     }
//     res.json(results);
//   });
// });

// // API สำหรับดึงข้อมูลสินค้าตาม id
// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;

//   const sqlProductById = `
// SELECT 
//     p.id,
//     p.name,
//     pd.installation_type,
//     pd.screen_size,
//     pd.resolution,
//     pd.brightness,
//     p.price,
//     p.status,
//     p.category_id,
//     pd.connectivity,
//     pd.operating_system,
//     c.name AS category_name,
//     (
//         SELECT pi.image_path 
//         FROM product_images pi 
//         WHERE pi.product_id = p.id AND pi.is_main = 1 LIMIT 1
//     ) AS image_path,
//     (
//         SELECT GROUP_CONCAT(pi.image_path)
//         FROM product_images pi
//         WHERE pi.product_id = p.id AND pi.is_main = 0
//     ) AS additional_images
// FROM 
//     products p
// INNER JOIN 
//     product_details pd ON p.id = pd.product_id
// INNER JOIN 
//     categories c ON p.category_id = c.id
// WHERE 
//     p.id = ?;

//   `;

//   db.query(sqlProductById, [productId], (err, results) => {
//     if (err) {
//       console.error("Error fetching product:", err);
//       res.status(500).send("An error occurred while fetching the product.");
//       return;
//     }

//     if (results.length === 0) {
//       res.status(404).send("Product not found.");
//       return;
//     }

//     res.json(results[0]); // ส่งสินค้าชิ้นเดียวกลับไป
//   });
// });

// // API สำหรับดึงข้อมูล categories
// const sqlCategories = `
// SELECT 
//     id, 
//     name, 
//     created_at, 
//     img_cate
// FROM 
//     categories
// `;

// app.get("/api/categories", (req, res) => {
//   db.query(sqlCategories, (err, results) => {
//     if (err) {
//       console.error("Error fetching categories:", err);
//       res.status(500).send("An error occurred while fetching categories.");
//       return;
//     }
//     res.json(results);
//   });
// });

// // เปิดเซิร์ฟเวอร์
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });









// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const crypto = require('crypto');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ✅ ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'website',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ✅ ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // ✅ API: เข้าสู่ระบบ
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

//   try {
//     const [rows] = await pool.query(
//       `SELECT emp_id, emp_name, emp_last, emp_email, emp_img FROM employees 
//        WHERE emp_user = ? AND emp_pwd = ?`,
//       [username, hashedPassword]
//     );

//     if (rows.length > 0) {
//       console.log('✅ เข้าสู่ระบบสำเร็จ:', rows[0]);
//       res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: rows[0] });
//     } else {
//       console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });






// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const crypto = require('crypto');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// // ระบุ path ให้ตรงกับตำแหน่งที่เก็บไฟล์ภาพจริง (D:\ecom\admin\public\products)
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ✅ ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'step',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ✅ ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // ✅ API: เข้าสู่ระบบ
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ? AND admin_pwd = ?`,
//       [username, hashedPassword]
//     );

//     if (rows.length > 0) {
//       console.log('✅ เข้าสู่ระบบสำเร็จ:', rows[0]);
//       res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: rows[0] });
//     } else {
//       console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// // ✅ API: ดึงข้อมูลสินค้าจากตาราง products พร้อมรูปหลักจาก product_images
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//     SELECT 
//   p.product_id, 
//   p.product_name,  
//   p.category_id,
//   p.images_main, 
//   p.created_at,
//   p.series_id,
//   pi.path
// FROM products p
// LEFT JOIN product_images pi 
//   ON p.product_id = pi.product_id
// ORDER BY p.category_id ASC, p.created_at DESC;
// `;

//     const [rows] = await pool.query(query);
//     res.status(200).json({ success: true, products: rows });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });



// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const argon2 = require('argon2'); // ใช้ argon2 สำหรับการเข้ารหัสด้วย Argon2id
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'step',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // API: เข้าสู่ระบบ โดยใช้ Argon2id ในการตรวจสอบรหัสผ่าน
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   try {
//     // ค้นหาผู้ดูแลระบบตาม username
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ?`,
//       [username]
//     );

//     if (rows.length > 0) {
//       const admin = rows[0];
      
//       // Debug: แสดงข้อมูล admin ที่ได้มา
//       console.log("Admin record:", admin);

//       // ตรวจสอบว่ามีฟิลด์ admin_pwd ก่อนใช้ argon2.verify
//       if (!admin.admin_pwd) {
//         console.error("❌ admin.admin_pwd is undefined for user:", username);
//         return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }

//       // ตรวจสอบรหัสผ่านด้วย argon2.verify
//       const validPassword = await argon2.verify(admin.admin_pwd, password);
//       if (validPassword) {
//         console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);
//         res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: admin });
//       } else {
//         console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//         res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }
//     } else {
//       console.log('❌ ผู้ใช้ไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// // API: ดึงข้อมูลสินค้าจากตาราง products พร้อมรูปหลักจาก product_images
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         p.product_id, 
//         p.product_name,  
//         p.category_id,
//         p.images_main, 
//         p.created_at,
//         p.series_id,
//         pi.path
//       FROM products p
//       LEFT JOIN product_images pi 
//         ON p.product_id = pi.product_id
//       ORDER BY p.product_id ASC, p.category_id;
//     `;
//     const [rows] = await pool.query(query);
//     res.status(200).json({ success: true, products: rows });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });



const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const argon2 = require('argon2'); // สำหรับการเข้ารหัสรหัสผ่าน
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ให้บริการไฟล์ static สำหรับรูปสินค้า
app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// ตั้งค่าการเชื่อมต่อ MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'step',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
async function checkDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
    process.exit(1);
  }
}
checkDBConnection();

// API: เข้าสู่ระบบ โดยใช้ Argon2id สำหรับตรวจสอบรหัสผ่าน
app.post('/api/admin/login', async (req, res) => {
  console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM admin 
       WHERE admin_user = ?`,
      [username]
    );

    if (rows.length > 0) {
      const admin = rows[0];
      console.log("Admin record:", admin);

      if (!admin.admin_pwd) {
        console.error("❌ admin.admin_pwd is undefined for user:", username);
        return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }

      const validPassword = await argon2.verify(admin.admin_pwd, password);
      if (validPassword) {
        console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);
        res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: admin });
      } else {
        console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
    } else {
      console.log('❌ ผู้ใช้ไม่ถูกต้อง');
      res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }
  } catch (error) {
    console.error('❌ Error during login:', error);
    res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});

// API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
app.get('/api/products', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.product_id, 
        p.product_name,  
        p.category_id,
        p.images_main, 
        p.created_at,
        p.series_id
      FROM products p
      ORDER BY p.product_id ASC
    `;
    const [rows] = await pool.query(query);
    res.status(200).json({ success: true, products: rows });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
  }
});

// API: ดึงรายละเอียดสินค้าโดย product_id สำหรับหน้าแก้ไข (edit_form.tsx)
// ตัวอย่าง query JOIN กับ product_images (เฉพาะรูปหลัก) และ product_details (ถ้ามี)
app.get('/api/products/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const query = `
      SELECT 
        p.product_id, 
        p.product_name, 
        p.category_id,
        p.series_id,
        p.images_main,
        p.created_at,
        pd.detail,  -- สมมุติว่ามีคอลัมน์ detail ใน product_details
        pi.path AS image_path
      FROM products p
      LEFT JOIN product_details pd ON p.product_id = pd.product_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_main = 1
      WHERE p.product_id = ?
      LIMIT 1
    `;
    const [rows] = await pool.query(query, [product_id]);
    if (rows.length > 0) {
      res.status(200).json({ success: true, product: rows[0] });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ success: false, message: "Error fetching product details", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
