import React, { useState } from 'react';
import './App.css'; // Tambahkan file CSS yang akan digunakan

import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password
    };

    axios.post('http://localhost:5000/login', userData)
      .then((response) => {
        console.log(response.data.message); // Untuk sementara, tampilkan pesan dari server di konsol
        // Lakukan logika untuk menangani autentikasi sesuai dengan respons dari server
      })
      .catch((error) => {
        console.error('Error saat login: ', error);
        setError('Username atau password salah'); // Set pesan error jika login gagal
      });
  };

  return (
    <div className="login-container">
      <h2>Halaman Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn" href="home.js">Login</button>
      </form>
      <div className="social-icons">
        <i className="fa fa-facebook"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-instagram"></i>
      </div>
      <a href='home.js'>skip</a>
    </div>
  );
};

export default Login;
