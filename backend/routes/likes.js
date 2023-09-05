import express from "express";
import { getLikes, addLike, deleteLikes } from "../controllers/like.js";

const router = express.Router()

router.get("/", getLikes)
router.get("/", addLike)
router.get("/", deleteLikes)

export default router