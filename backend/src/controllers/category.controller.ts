import { type Request, type Response} from 'express';
import prisma from '../utils/prisma';
import type { Category } from '../types/category.type';

// GET /categories
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories: Category[] = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /categories/:id
export const getCategoryById = async (req: Request<Category>, res: Response) => {
    const { id } = req.params;
    try {
        const category: Category | null = await prisma.category.findUnique({
            where: { id: Number(id) },
        }); 
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST /categories
export const createCategory = async (req: Request<{}, {}, Category>, res: Response) => {
    const { name, muscles } = req.body;
    try {
        const newCategory: Category = await prisma.category.create({
            data: { name, muscles },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

//UPDATE /categories/:id
export const updateCategory = async (req: Request<Category, {}, Category>, res: Response) => {
    const { id } = req.params;
    const { name, muscles } = req.body;
    try {
        const updatedCategory: Category = await prisma.category.update({
            where: { id: Number(id) },
            data: { name, muscles },
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE /categories/:id
export const deleteCategory = async (req: Request<Category>, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.category.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
