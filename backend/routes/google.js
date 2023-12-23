const router = require("express").Router();
const nodemailer = require("nodemailer");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const Google = require("../models/Google");

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
router.post("/gmail/send", async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    let otp;

    if (checkEmail) {
      if (checkEmail.username) {
        return res.redirect("http://localhost:3000/login");
      }
      otp = checkEmail.googleOtp;
    } else {
      otp = generateOTP();
      const newUser = new User({
        email: req.body.email,
        google: req.body.email,
        googleOtp: otp,
      });
      const newGoogle = new Google({
        email: req.body.email,
        otp: otp,
      });
      await newUser.save();
      await newGoogle.save();
    }

    const mailOptions = {
      from: "Sync, Manage, and Direct Admin",
      to: req.body.email,
      subject: "Your OTP for Login",
      html: `
        <!DOCTYPE html>
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

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Endpoint untuk mengirim ulang OTP
router.post("/gmail/resend", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = user.otp;

    // Kirim email dengan OTP
    const mailOptions = {
      from: `"Sync, Manage, and Direct Admin" <${process.env.EMAIL}>`,
      to: req.body.email,
      subject: "Your OTP for Login",
      html: `<!DOCTYPE html>
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
        </html>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json("Email has been sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Endpoint untuk verifikasi OTP
router.post("/gmail/verify", async (req, res) => {
  const { otp } = req.body;

  try {
    // Cari data pengguna di MongoDB berdasarkan email dan otp
    const user = await User.findOne({ otp });

    if (user) {
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

router.put("/gmail/register", async (req, res) => {
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

module.exports = router;
