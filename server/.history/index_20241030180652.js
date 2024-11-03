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
  host: 'localhost',       // Thay bằng host của bạn (ví dụ: localhost)
  user: 'root',            // Thay bằng tên người dùng MySQL của bạn
  password: '1234',        // Thay bằng mật khẩu MySQL của bạn
  database: 'th4mysql'     // Thay bằng tên database của bạn
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

  db.query('INSERT INTO account (email, password) VALUES (?, ?)', [email, password], (err, results) => {
    if (err) {
      res.status(500).send('Lỗi khi tạo tài khoản');
    } else {
      res.status(201).send('Tài khoản đã được tạo thành công');
    }
  });
});

// Đăng nhập
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM account WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send('Email hoặc mật khẩu không chính xác');
    }

    const user = results[0];

    // Kiểm tra mật khẩu
    if (user.password === password) {
      res.send('Đăng nhập thành công');
    } else {
      res.status(401).send('Email hoặc mật khẩu không chính xác');
    }
  });
});

// Quên mật khẩu
app.post('/api/forgot-password', (req, res) => {
  const { email, newPassword } = req.body;

  db.query('UPDATE account SET password = ? WHERE email = ?', [newPassword, email], (err, results) => {
    if (err) {
      res.status(500).send('Lỗi khi cập nhật mật khẩu');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Email không tồn tại');
    } else {
      res.send('Mật khẩu đã được cập nhật thành công');
    }
  });
});

// API lấy dữ liệu từ MySQL
app.get('/api/account', (req, res) => {
  db.query('SELECT * FROM account', (err, results) => {
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
