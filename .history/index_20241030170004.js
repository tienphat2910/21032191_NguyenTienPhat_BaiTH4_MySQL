const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Cấu hình CORS cho phép các ứng dụng client kết nối
app.use(cors());

// Cấu hình kết nối đến MySQL
const db = mysql.createConnection({
  host: 'localhost',       // Thay bằng host của bạn (ví dụ: localhost)
  user: 'root',            // Thay bằng tên người dùng MySQL của bạn
  password: '1234',            // Thay bằng mật khẩu MySQL của bạn
  database: 'th4mysql'       // Thay bằng tên database của bạn
});

db.connect(err => {
  if (err) {
    console.error('Kết nối đến MySQL thất bại:', err);
  } else {
    console.log('Kết nối đến MySQL thành công');
  }
});

// Tạo API lấy dữ liệu từ MySQL
app.post('/api/account', (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra thông tin đăng nhập
  db.query('SELECT * FROM account WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      return res.status(500).send('Lỗi khi kiểm tra thông tin đăng nhập');
    }
    if (results.length > 0) {
      res.json({ success: true, message: 'Đăng nhập thành công' });
    } else {
      res.json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server chạy trên http://localhost:${PORT}`);
});
