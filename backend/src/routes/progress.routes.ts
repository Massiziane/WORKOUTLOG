import { Router } from 'express';
import {
    getAllProgress,
    getProgressById,
    createProgress,
    updateProgress,
    deleteProgress
} from '../controllers/progress.controller';


const router = Router();

// get all progress records
router.get('/', getAllProgress);

// get progress record by ID
router.get('/:id', getProgressById);

// create a new progress record
router.post('/', createProgress);

// update progress record by ID
router.put('/:id', updateProgress);

// delete progress record by ID
router.delete('/:id', deleteProgress);

export default router;