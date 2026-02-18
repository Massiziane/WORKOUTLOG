import express from "express";
import { addWorkoutToProgram } from "../controllers/WorkoutProgram.controller";

const router = express.Router();

// POST /program-workouts
router.post("/", addWorkoutToProgram);

export default router;
