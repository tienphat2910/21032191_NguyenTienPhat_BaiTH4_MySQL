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
  database: 'reactmysql'
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
  const { email, password, name, avatar } = req.body; // Thêm name và avatar vào đây
  if (!email || !password || !name || !avatar) { // Kiểm tra tất cả các trường
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email, mật khẩu, tên và hình đại diện' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra email' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Email đã tồn tại' });
    }

    db.query('INSERT INTO users (email, password, name, avatar) VALUES (?, ?, ?, ?)', [email, password, name, avatar], (err) => {
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
  var sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], function (err, results) {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length > 0) {
      // Giả định rằng thông tin người dùng bao gồm link ảnh
      return res.json({
        avatar: results[0].avatar, // Trả về link ảnh
        name: results[0].name // Trả về tên người dùng
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});


app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra email' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Email không tồn tại' });
    }

    // Nếu email tồn tại
    return res.status(200).json({ success: true });
  });
});

// Đặt lại mật khẩu (không thay đổi)
app.post('/api/reset-password', (req, res) => {
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
