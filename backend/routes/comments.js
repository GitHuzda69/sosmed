const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

//get a comment

router.get("/:postid", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
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

router.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.userId === req.body.id) {
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
      if (comment.userId === req.body.id) {
        await comment.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;