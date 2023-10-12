import express from "express";
import { newConversation, getConversation } from "../controllers/conversation.js";

const router = express.Router()

router.post("/:userId", newConversation)
router.get("/", getConversation)

export default router