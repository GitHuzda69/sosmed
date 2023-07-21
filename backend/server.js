const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost', // Ganti dengan host database MySQL Anda
  user: 'username', // Ganti dengan username MySQL Anda
  password: 'password', // Ganti dengan password MySQL Anda
  database: 'database_name' // Ganti dengan nama database MySQL Anda
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ', err);
    return;
  }
  console.log('Terhubung ke database MySQL');
});

// Tambahkan endpoint untuk login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error saat login: ', err);
      res.status(500).json({ message: 'Terjadi kesalahan saat login' });
      return;
    }

    if (result.length === 1) {
      res.status(200).json({ message: 'Login berhasil' });
    } else {
      res.status(401).json({ message: 'Login gagal' });
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
