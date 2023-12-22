const router = require("express").Router();
const Notif = require("../models/Notification");

router.get("/", async (req, res) => {
  const own = req.query.own;
  const read = req.query.read;

  try {
    let query = {};
    if (own) {
      query.own = own;
    }
    if (read !== undefined) {
      query.read = read;
    }
    const notif = await Notif.find(query);
    res.status(200).json(notif);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const currentUser = req.body.userId;
  try {
    if (req.body.own === currentUser) {
      return res.status(200).json("returning");
    }

    const existingNotif = await Notif.findOne(req.body);
    if (existingNotif) {
      await Notif.deleteOne(req.body);
      return res.status(200).json("Notif removed");
    }
    const newNotif = new Notif(req.body);
    await newNotif.save();
    return res.status(200).json("Notif saved");
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
