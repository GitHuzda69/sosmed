import express from "express";
import { getMessage, addMessage } from "../controllers/message.js";

const router = express.Router()

router.post("/", addMessage)
router.get("/:conversationsid", getMessage)

export default router