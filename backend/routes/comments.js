import express from "express";
import { getComments, addComments } from "../controllers/comment.js"
const router = express.Router()

router.get("/", getComments)
router.get("/", addComments)

export default router