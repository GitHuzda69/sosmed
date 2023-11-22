const router = require("express").Router();
const Google = require("../models/Google");
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uzudatoro002@gmail.com',
    pass: 'Ujeck12345',
  },
});

// Simpan data pengguna yang telah meminta OTP
const otpRequests = {};

// Endpoint untuk mengirim OTP
router.post('/gmail/send', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(); // Function to generate OTP

  // Kirim email dengan OTP
  const mailOptions = {
    from: 'uzudatoro002@gmail.com',
    to: email,
    subject: 'Your OTP for Login',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Simpan data pengguna di MongoDB
    const user = new Google({ email, otp });
    await user.save();

    otpRequests[email] = otp; // Simpan OTP bersama dengan alamat email pengguna
    res.status(200).json({ message: 'OTP sent successfully' });
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
