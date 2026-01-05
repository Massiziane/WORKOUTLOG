import { Router } from 'express';
import {
    getAllSetTemplates,
    getSetTemplateById,
    createSetTemplate,
    updateSetTemplate,
    deleteSetTemplate
} from '../controllers/setTemplate.controller';


const router = Router();

// GET all set templates
router.get('/', getAllSetTemplates);

// GET set template by ID
router.get('/:id', getSetTemplateById);

// POST create a new set template
router.post('/', createSetTemplate);

// PUT update set template by ID
router.put('/:id', updateSetTemplate);

// DELETE set template by ID
router.delete('/:id', deleteSetTemplate);

export default router;