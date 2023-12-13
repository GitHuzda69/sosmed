const router = require("express").Router();
const axios = require('axios');
const dotenv = require("dotenv");
const User = require("../models/User");
const bcrypt = require("bcrypt");

dotenv.config();

// Penyimpanan sederhana dalam memori
const userStore = {};

// Sesuaikan dengan informasi aplikasi Facebook Anda
const FACEBOOK_APP_ID = process.env.FB_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FB_SECRET_TOKEN;
const CALLBACK_HTTPS = process.env.HTTPS;

// Route untuk autentikasi menggunakan Facebook
router.get('/facebook', async (req, res) => {
  try {
    const redirectUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${CALLBACK_HTTPS}&scope=email`;
    res.status(200).json(redirectUrl);
  } catch (error) {
    console.error('Error making Facebook OAuth request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/facebook/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.status(400).send('Authentication failed');
    return;
  }

  try {
    // Mendapatkan access token dari Facebook
    const tokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${FACEBOOK_APP_ID}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}&redirect_uri=${CALLBACK_HTTPS}`;

    const response = await axios.get(tokenUrl);
    const accessToken = response.data.access_token;

    const userUrl = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`;
    const userResponse = await axios.get(userUrl);
    const userData = userResponse.data;
    const checkEmail = await User.findOne({ email: userData.email });
    if (checkEmail) {
      res.redirect('http://localhost:3000/login')
    }
    const newUser = new User({
      email: userData.email,
      displayname: userData.name,
      otp: accessToken,
    });
    await newUser.save();
    return res.redirect(`http://localhost:3000/facebook?code=${accessToken}`);
  } catch (error) {
    console.error('Error during Facebook authentication:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Daftar akun menggunakan facebook
router.put("/facebook/register", async (req, res) => {
  try {
    // Generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const bio = "Hello, This is my biodata";

    // Find and update user based on email
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        username: req.body.username,
        password: hashedPassword,
        displayname: req.body.displayname,
        desc: bio,
      },
      { new: true } // Return the updated user data
    );

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get user information facebook
router.get("/facebook/users", async (req, res) => {
  const accessToken = req.query.code;
  try {
    const user = await User.findOne({ otp: accessToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
