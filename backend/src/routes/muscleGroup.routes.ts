import { Router } from 'express';
import { getMuscleGroups } from '../controllers/muscleGroup.controller';

const router = Router();

// GET muscle groups
router.get("/", getMuscleGroups);

export default router;