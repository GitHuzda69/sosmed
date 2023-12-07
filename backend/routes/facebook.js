const router = require("express").Router();
const axios = require('axios');
const dotenv = require("dotenv")
dotenv.config();

// Penyimpanan sederhana dalam memori
const userStore = {};

// Sesuaikan dengan informasi aplikasi Facebook Anda
const FACEBOOK_APP_ID = process.env.FB_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FB_SECRET_TOKEN;
const CALLBACK_URL = 'http://localhost:3000/facebook/callback';

// Route untuk autentikasi menggunakan Facebook
router.get('/facebook', (req, res) => {
  const redirectUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${CALLBACK_URL}&scope=email`;
  return res.status(200).json(redirectUrl)
});

// Callback setelah autentikasi berhasil
router.get('/facebook/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.status(400).send('Authentication failed');
    return;
  }

  try {
    // Mendapatkan access token dari Facebook
    const tokenUrl = `https://graph.facebook.com/oauth/v18.0/access_token?client_id=${FACEBOOK_APP_ID}?client_secret=${FACEBOOK_APP_SECRET}?redirect_uri=${CALLBACK_URL}?code=${code}`;
    const tokenResponse = await axios.get(tokenUrl);

    const access_token = tokenResponse.data;

    // Mendapatkan data pengguna dari Facebook menggunakan access token
    const userDataUrl = `https://graph.facebook.com/v12.0/me`;
    const userDataResponse = await axios.get(userDataUrl, {
      params: {
        fields: 'id,name,email',
        access_token: access_token,
      },
    });
    const userData = userDataResponse.data;
    console.log(userData);

    // Simpan data pengguna di penyimpanan sederhana
    const userId = userData.id;
    userStore[userId] = userData;

    // Redirect atau tindakan lainnya setelah login berhasil
    res.status(200).json(`Hello, ${userData.name}! <a href="/logout">Logout</a>`);
  } catch (error) {
    console.error('Error during Facebook authentication:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Route untuk logout
router.get('/facebook/logout', (req, res) => {
  // Hapus data pengguna dari penyimpanan sederhana
  const userId = req.session.userId;
  delete userStore[userId];

  res.send('You have been logged out. <a href="/">Home</a>');
});

// Route proteksi yang memeriksa apakah pengguna sudah login
router.get('/facebook/check', (req, res) => {
  const userId = req.session.userId;

  if (userId && userStore[userId]) {
    res.send(`Hello, ${userStore[userId].displayName}! <a href="/logout">Logout</a>`);
  } else {
    res.send('Hello, guest! <a href="/auth/facebook">Login with Facebook</a>');
  }
});


module.exports = router;
