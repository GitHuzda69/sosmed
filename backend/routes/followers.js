import express from "express";
import { getFollower } from "../controllers/follower.js";

const router = express.Router()

router.post("/", getFollower)


export default router