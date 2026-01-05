import { Router } from 'express';
import {
    getAllExercises,
    getExerciseById,
    createExercise,
    deleteExercise,
    updateExercise
} from '../controllers/exercise.controller';


const router = Router();

// GET all categories
router.get('/', getAllExercises);

// GET category by ID
router.get('/:id', getExerciseById);

// POST create a new category
router.post('/', createExercise);

// UPDATE category by ID
router.put('/:id', updateExercise);

// DELETE category by ID
router.delete('/:id', deleteExercise);

export default router;