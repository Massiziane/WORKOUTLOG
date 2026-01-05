import { Router } from "express";
import {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout
} from "../controllers/workout.controller";

const router = Router();

// GET all workouts
router.get("/", getAllWorkouts);
// GET workout by ID
router.get("/:id", getWorkoutById);
// POST create a new workout
router.post("/", createWorkout);
// UPDATE workout by ID
router.put("/:id", updateWorkout);
// DELETE workout by ID
router.delete("/:id", deleteWorkout);


export default router;