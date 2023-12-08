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
    const tokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}}&redirect_uri=${CALLBACK_URL}`;

    return res.status(200).json(tokenUrl);
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

//delete informations
router.get('/facebook/delete', async (req, res) => {
  const { user_id, access_token } = req.query;
 
  try {
     const response = await axios.delete(
       `https://graph.facebook.com/${user_id}?access_token=${access_token}`
     );
 
     if (response.status === 200) {
       res.status(200).json({ message: 'User deleted successfully' });
     } else {
       res.status(400).json({ message: 'Error deleting user' });
     }
  } catch (error) {
     console.log(error);
     res.status(500).json({ message: 'Internal server error' });
  }
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
