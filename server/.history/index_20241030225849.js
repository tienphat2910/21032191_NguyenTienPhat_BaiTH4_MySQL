const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8081', // Thay đổi nếu cần
}));

// Cấu hình kết nối đến MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'th4mysql'
});

db.connect(err => {
  if (err) {
    console.error('Kết nối đến MySQL thất bại:', err);
  } else {
    console.log('Kết nối đến MySQL thành công');
  }
});

// Tạo tài khoản
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
  }

  db.query('SELECT * FROM account WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra email' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Email đã tồn tại' });
    }

    db.query('INSERT INTO account (email, password) VALUES (?, ?)', [email, password], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Lỗi khi tạo tài khoản' });
      }
      return res.status(201).json({ success: true, message: 'Tài khoản đã được tạo thành công' });
    });
  });
});

// Đăng nhập
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
  }

  db.query('SELECT * FROM account WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra thông tin đăng nhập' });
    }

    if (results.length > 0) {
      return res.status(200).json({ success: true, message: 'Đăng nhập thành công' });
    } else {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác' });
    }
  });
});

// Quên mật khẩu
app.post('/api/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu mới' });
  }

  db.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi cập nhật mật khẩu' });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({ success: true, message: 'Mật khẩu đã được cập nhật thành công' });
    } else {
      return res.status(404).json({ success: false, message: 'Email không tồn tại' });
    }
  });
});

// API lấy dữ liệu từ MySQL
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Lỗi khi lấy dữ liệu từ database');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server chạy trên http://localhost:${PORT}`);
});
