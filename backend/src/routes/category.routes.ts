import { Router } from 'express';
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
} from '../controllers/category.controller';

const router = Router();

// GET all categories
router.get('/', getAllCategories);

// GET category by ID
router.get('/:id', getCategoryById);

// POST create a new category
router.post('/', createCategory);

// PUT update category by ID (not implemented yet
router.put('/:id', updateCategory);

// DELETE category by ID
router.delete('/:id', deleteCategory);

export default router;