const express = require("express");
const User = require("../models/User");
const router = express.Router();

//get user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ? await User.findById(userId) : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get 2 user
router.get("/:userId/:currentUser", async (req, res) => {
  const cleanUrl = req.params.userId.replace(/^\/|\/$/g, "");
  const idsArray = cleanUrl.split(",");
  if (idsArray[0] !== req.params.currentUser) {
    const user = await User.findById(idsArray[0]);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } else if (idsArray[1] !== req.params.currentUser) {
    const user = await User.findById(idsArray[1]);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } else {
    return res.status(403).json("UserId Not Found");
  }
});

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

module.exports = router;
