import { Router } from 'express';
import {
    getAllWorkoutExercises,
    getWorkoutExerciseById,
    createWorkoutExercise,
    updateWorkoutExercise,
    deleteWorkoutExercise
} from '../controllers/workoutExercise.controller';


const router = Router();

// GET all workout exercises
router.get('/', getAllWorkoutExercises);

// GET workout exercise by ID
router.get('/:id', getWorkoutExerciseById);

// POST create a new workout exercise
router.post('/', createWorkoutExercise);

// PUT update workout exercise by ID
router.put('/:id', updateWorkoutExercise);

// DELETE workout exercise by ID
router.delete('/:id', deleteWorkoutExercise);

export default router;