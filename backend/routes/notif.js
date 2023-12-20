const router = require("express").Router();
const Notif = require("../models/Notification");
const User = require("../models/User");

//get notifications without read
router.get("/", async (req, res) => {
  try {
    const post = await Notif.find(req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get notifications with read
router.get("/read", async (req, res) => {
  try {
    const notifications = await Notif.find({ own: req.query.own, read: req.query.read });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
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
