import { Router } from 'express';
import {
    getAllMuscleGroups,
    getMuscleGroupById,
    createMuscleGroup,
    updateMuscleGroup,
    deleteMuscleGroup
} from '../controllers/muscleGroup.controller';


const router = Router();

// GET muscle groups
router.get("/", getAllMuscleGroups);

// GET muscle group by ID
router.get("/:id", getMuscleGroupById);

// POST create a new muscle group
router.post("/", createMuscleGroup);

// PUT update muscle group by ID
router.put("/:id", updateMuscleGroup);

// DELETE muscle group by ID
router.delete("/:id", deleteMuscleGroup);


export default router;