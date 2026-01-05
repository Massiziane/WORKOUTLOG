import { Router } from "express";
import {
    getAllWorkoutSets,
    getWorkoutSetById,
    createWorkoutSet,
    updateWorkoutSet,
    deleteWorkoutSet
} from "../controllers/workoutSet.controller";


const router = Router();

// GET all workout sets
router.get("/", getAllWorkoutSets);

// GET workout set by ID
router.get("/:id", getWorkoutSetById);

// POST create a new workout set
router.post("/", createWorkoutSet);

// PUT update workout set by ID
router.put("/:id", updateWorkoutSet);

// DELETE workout set by ID
router.delete("/:id", deleteWorkoutSet);

export default router;