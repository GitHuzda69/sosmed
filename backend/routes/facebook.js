const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");
const User = require("../models/User");
const Facebook = require("../models/Facebook");
const bcrypt = require("bcrypt");

dotenv.config();

// Penyimpanan sederhana dalam memori
const userStore = {};

// Sesuaikan dengan informasi aplikasi Facebook Anda
const FACEBOOK_APP_ID = process.env.FB_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FB_SECRET_TOKEN;
const CALLBACK_HTTPS = process.env.HTTPS;

// Route untuk autentikasi menggunakan Facebook
router.get("/facebook", async (req, res) => {
  try {
    const redirectUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${CALLBACK_HTTPS}&scope=email`;
    res.status(200).json(redirectUrl);
  } catch (error) {
    console.error("Error making Facebook OAuth request:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/facebook/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.status(400).send("Authentication failed");
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
    const checkFacebook = await Facebook.findOne({ email: userData.email });
    if (checkEmail && checkEmail.facebook) {
      return res.redirect("http://localhost:3000/login");
    }
    if (checkEmail && checkEmail.connectFB === true) {
      const newAccount = new Facebook({
        email: userData.email,
        displayname: userData.name,
        otp: accessToken,
      });
      await newAccount.save();
      await axios.put(`http://localhost:8800/facebook/connect?email=${userData.email}`);
      res.status(200).json("Your Account connected");
    }
    if (checkFacebook && checkFacebook) {
      return res.redirect(`http://localhost:3000/login`);
    }
    const newAccount = new Facebook({
      email: userData.email,
      displayname: userData.name,
      otp: accessToken,
    });
    await newAccount.save();
    return res.redirect(`http://localhost:3000/facebook?code=${accessToken}`);
  } catch (error) {
    console.error("Error during Facebook authentication:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Daftar akun menggunakan facebook
router.post("/facebook/register", async (req, res) => {
  accessToken = req.query.code;
  try {
    const facebook = await Facebook.findOne({ otp: accessToken });
    if (!facebook) {
      return res.status(404).json({ error: "User not found" });
    }
    // Generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const bio = "Hello, This is my biodata";

    const newUser = new User({
      username: req.body.username,
      email: facebook.email,
      password: hashedPassword,
      displayname: req.body.displayname,
      desc: bio,
      facebook: facebook.email,
      facebookOtp: accessToken,
      connectFB: false,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get user information facebook
router.get("/facebook/users", async (req, res) => {
  const accessToken = req.query.code;
  try {
    const user = await Facebook.findOne({ otp: accessToken });
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

//delete information facebook
router.delete("/facebook", async (req, res) => {
  const email = req.query.email;
  try {
    const user = await Facebook.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Facebook.deleteOne({ email: email });
    await User.findOneAndUpdate({ facebook: email }, { $unset: { facebook: 1, facebookOtp: 1 }, $set: { connectFB: true } });
    res.status(200).json("Account has been disconnected");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//update information facebook
router.put("/facebook/connect", async (req, res) => {
  const email = req.query.email;
  try {
    await User.findOneAndUpdate({ email: email }, { $set: { connectFB: false, facebook: email } });
    res.status(200).json("Account has been Updated");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
