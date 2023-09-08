import express from "express";
import { getRelationships, addRelationship, deleteRelationships } from "../controllers/relationship.js";

const router = express.Router()

router.get("/", getRelationships)
router.post("/", addRelationship)
router.delete("/", deleteRelationships)

export default router