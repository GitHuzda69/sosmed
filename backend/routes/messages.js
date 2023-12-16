const router = require("express").Router();
const Message = require("../models/Message");

//add message

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get message

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a message

router.delete("/:id", async (req, res) => {
  try {
    const mess = await Message.findById(req.params.id);
    if (mess.sender === req.body.userId) {
      await mess.deleteOne();
      res.status(200).json("the message has been deleted");
    } else {
      res.status(403).json("you can delete only your message");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});  

module.exports = router;