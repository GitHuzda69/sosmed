import express from "express";
import { getFriend } from "../controllers/friend.js";

const router = express.Router()

router.get("/", getFriend)

export default router