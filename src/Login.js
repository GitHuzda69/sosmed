import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        // Lakukan penanganan error di sini
      });
  };

  return (
    <div>
      <h2>Halaman Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
