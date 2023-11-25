const router = require("express").Router();
const nodemailer = require('nodemailer');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require('uuid');

dotenv.config();


// Helper function to generate OTP
function generateOTP() {
  return uuidv4().substr(0, 6);
}

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Endpoint untuk mengirim OTP
router.post('/gmail/send', async (req, res) => {
  const otp = generateOTP(); // Function to generate OTP

  // Kirim email dengan OTP
  const mailOptions = {
    name: `Sync, Manage, and Direct Admin`,
    address: process.env.EMAIL,
    to: req.body.email,
    subject: 'Your OTP for Login',
    html : `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kode OTP Anda</title>
    </head>
    <body>
        <p>Halo,</p>
        <p>Ini adalah email konfirmasi dengan Kode OTP Anda:</p>
        <h2 style="color:#3498db;">${otp}</h2>
        <p>Harap gunakan kode ini untuk verifikasi.</p>
        <p>Terima kasih!</p>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Simpan data pengguna di MongoDB
    const newUser = new User({ 
      email: req.body.email,
      otp: otp,
     });
     const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Endpoint untuk verifikasi OTP
router.post('/gmail/verify', async (req, res) => {
  const { otp } = req.body;

  try {
    // Cari data pengguna di MongoDB berdasarkan email dan otp
    const user = await User.findOne({ otp });

    if (user) {
      res.status(200).json({ message: 'OTP verification successful' });
    } else {
      res.status(401).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

router.put("/gmail/register", async (req, res) => {
  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });

    if (existingUser) {
      return res.status(409).json({ error: "Username or email already exists" });
    }

    // Generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const bio = "Hello, This is my biodata";

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      displayname: req.body.displayname,
      desc: bio,
    });

    // Save the user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
