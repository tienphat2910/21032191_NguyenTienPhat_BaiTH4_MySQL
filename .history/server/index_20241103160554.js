const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Import bcrypt
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());
app.use(cors({
  origin: '*', // Thay đổi nếu cần
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

// Tạo tài khoản với mã hóa mật khẩu
app.post('/api/register', async (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (!email || !password || !name || !avatar) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email, mật khẩu, tên và hình đại diện' });
  }

  // Kiểm tra nếu email đã tồn tại
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra email' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu tài khoản mới vào cơ sở dữ liệu
    db.query('INSERT INTO users (email, password, name, avatar) VALUES (?, ?, ?, ?)', [email, hashedPassword, name, avatar], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Lỗi khi tạo tài khoản' });
      }
      return res.status(201).json({ success: true, message: 'Tài khoản đã được tạo thành công' });
    });
  });
});

// Đăng nhập với xác thực mật khẩu
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Kiểm tra mật khẩu đã mã hóa
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return res.json({
          email: user.email,
          avatar: user.avatar,
          name: user.name,
        });
      } else {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
      }
    } else {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  });
});

// Các API khác giữ nguyên như ban đầu...
// Đặt lại mật khẩu (reset-password) sẽ mã hóa mật khẩu mới:
app.post('/api/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu mới' });
  }

  // Mã hóa mật khẩu mới
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err, results) => {
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

app.listen(PORT, () => {
  console.log(`Server chạy trên http://localhost:${PORT}`);
});
