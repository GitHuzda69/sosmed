import express from "express";
import { getPosts, addPost, deletePost, updatePost, getFyp } from "../controllers/post.js";

const router = express.Router()

router.get("/", getPosts)
router.get("/fyp", getFyp)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

export default router;