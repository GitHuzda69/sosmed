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
  const checkData = await Notif.find(req.body);
  try {
    if (req.body.own === currentUser) {
      return;
    }
    if (checkData) {
      await Notif.deleteOne();
    }
    const notif = await Notif.save(req.body);
    res.status(200).json(notif);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
