const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (!user) {
      return res.status(404).json("Wrong Username or Email");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).json("Wrong Password");
    }
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.post("/register", async (req, res) => {
  try {
    // Check if a user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existingUser) {
      return res.status(409).json("Username or email already exists");
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

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken", { secure: true, sameSite: "none" }).status(200).json("User has been logged out");
});

module.exports = router;
