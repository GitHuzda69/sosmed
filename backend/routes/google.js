const router = require("express").Router();
const nodemailer = require('nodemailer');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

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

// Perbarui access token saat diperlukan
transporter.on('token', (token) => {
  if (token) {
    // Perbarui token access
    oauth2Client.setCredentials({
      access_token: token.accessToken,
    });
  }
});

// Secara teratur perbarui access token (misalnya setiap 45 menit)
setInterval(() => {
  transporter.emit('token', {
    accessToken: oauth2Client.getAccessToken(),
    expires: Date.now() + 3600000, // Token akan kedaluwarsa setelah 1 jam
  });
}, 45 * 60 * 1000);

// Endpoint untuk mengirim OTP
router.post('/gmail/send', async (req, res) => {
  const otp = generateOTP(); // Function to generate OTP

  // Kirim email dengan OTP
  const mailOptions = {
    name: `Sync, Manage, and Direct Admin`,
    address: 'uzudatoro002@gmail.com',
    to: req.body.email,
    subject: 'Your OTP for Login',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Generate a password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const bio = "Hello, This is my biodata";

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
  const { email, otp } = req.body;

  try {
    // Cari data pengguna di MongoDB berdasarkan email dan otp
    const user = await Google.findOne({ email, otp });

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

// Helper function to generate OTP
function generateOTP() {
  return uuidv4().substr(0, 6);
}

module.exports = router;
