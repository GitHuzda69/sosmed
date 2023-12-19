const router = require("express").Router();
const Notif = require("../models/Notification");
const User = require("../models/User");

//get notifications
router.get("/", async (req, res) => {
  try {
    const post = await Notif.find(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a notif
router.post("/", async (req, res) => {
  const newNotif = new Notif(req.body);
  try {
    const savedPost = await newNotif.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
