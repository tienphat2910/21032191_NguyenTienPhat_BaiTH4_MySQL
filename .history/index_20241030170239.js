const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8081', // Thay đổi nếu cần
}));


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
