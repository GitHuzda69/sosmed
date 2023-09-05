import express from "express";
<<<<<<< HEAD
import { getLikes, addLike, deleteLikes } from "../controllers/like.js";
=======
import { getLikes } from "../controllers/like.js";
>>>>>>> 60cb372fcf86a8f5ac9fd912b2d7b23c0f301748

const router = express.Router()

router.get("/", getLikes)
<<<<<<< HEAD
router.get("/", addLike)
router.get("/", deleteLikes)
=======
>>>>>>> 60cb372fcf86a8f5ac9fd912b2d7b23c0f301748

export default router