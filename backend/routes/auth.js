const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment")

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


  router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const bio = "Hello, This is my biodata"
  
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        displayname: req.body.displayname,
        biodata: bio,
        joinat: moment().format("MMMM Do YYYY")
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("accessToken", {secure:true,sameSite:"none"}).status(200).json("User has been logged out");
    });


module.exports = router;