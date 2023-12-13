const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

//get a comment
router.get("/:postId", async (req, res) => {
    try {
      const comment = await Comment.find({ postId: req.params.postId });
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //post a commnets
  router.post("/", async (req, res) => {
    const newComment = new Comment(req.body);
    try {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //delete a comment
router.delete("/:userId", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.userId);
      if (comment.userId === req.body.userId) {
        await comment.deleteOne();
        res.status(200).json("the comment has been deleted");
      } else {
        res.status(403).json("you can delete only your comment");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update a comment
router.put("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.userId === req.body.userId) {
        await comment.updateOne({ $set: req.body });
        res.status(200).json("the comment has been updated");
      } else {
        res.status(403).json("you can update only your comment");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;