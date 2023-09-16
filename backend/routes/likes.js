import express from "express";
import { getLikes, addLike, deleteLikes } from "../controllers/like.js";

const router = express.Router()

router.get("/", getLikes)
router.post("/", addLike)
router.delete("/:id", deleteLikes)

export default router