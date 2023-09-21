import express from "express";
import { getComments, addComments, deleteComment, updateComment } from "../controllers/comment.js"
const router = express.Router()

router.get("/", getComments)
router.post("/", addComments)
router.delete("/:id", deleteComment)
router.put("/:id", updateComment)

export default router