const express =  require("express");
const User = require("../models/User");
const router = express.Router()


//get user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get 2 user
router.get("/:userId1/:userId2/:currentUser", async (req, res) => {
  console.log(req.params.userId1)
  console.log(req.params.userId2)
  console.log(req.params.currentUser)
  if (req.params.userId1 === req.params.currentUser) {
      const user2 = await User.findById(req.params.userId2);
      const { password: password2, updatedAt: updatedAt2, ...other2 } = user2._doc;
      res.status(200).json(other2);
    } else if (req.params.userId2 === req.params.currentUser) {  
      const user1 = await User.findById(req.params.userId1);
      const { password: password1, updatedAt: updatedAt1, ...other1 } = user1._doc;
      res.status(200).json(other1); 
  } else {
    // const user2 = await User.findById(userId2);
    //   const { password: password2, updatedAt: updatedAt2, ...other2 } = user2._doc;
    //   res.status(200).json(other2);
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