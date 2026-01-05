import { Router } from "express";
import {
    getAllPrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram
} from "../controllers/program.controller";


const router = Router();

// GET all programs
router.get("/", getAllPrograms);

// GET program by ID
router.get("/:id", getProgramById);

// POST create a new program
router.post("/", createProgram);

// PUT update program by ID
router.put("/:id", updateProgram);

// DELETE program by ID
router.delete("/:id", deleteProgram);

export default router;