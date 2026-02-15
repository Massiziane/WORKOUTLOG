import { type Request, type Response} from 'express';
import prisma from '../utils/prisma';
import type { Category } from '../types/category.type';

// GET /categories
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            include: { exercises: true },
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /categories/:id
export const getCategoryById = async (req: Request<Category>, res: Response) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id: Number(id) }, include : { exercises: true },
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
    try {
        const { name, Desc } = req.body;
        const newCategory = await prisma.category.create({
            data: { name, Desc : Desc ?? null },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

//UPDATE /categories/:id
export const updateCategory = async (req: Request<Category, {}, Category>, res: Response) => {
    try {
        const { id } = req.params;
        const { name, Desc } = req.body;    

        const existing = await prisma.category.findUnique({ where: { id: Number(id) } });
        if (!existing) return res.status(404).json({ message: "Category not found" });

        const updatedCategory= await prisma.category.update({
            where: { id: Number(id) },
            data: { name, Desc : Desc ?? null },
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE /categories/:id
export const deleteCategory = async (req: Request<Category>, res: Response) => {
    try {
        const { id } = req.params;

        const existing = await prisma.category.findUnique({ where: { id: Number(id) } });
        if (!existing) return res.status(404).json({ message: "Category not found" });
        
        await prisma.category.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
