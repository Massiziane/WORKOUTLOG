import type { Request, Response } from 'express';
import prisma from '../utils/prisma';
import type { SetTemplate } from '../types/setTemplate.type';

// GET All SET TEMPLATES
export const getAllSetTemplates = async (req: Request, res: Response) => {
    try {
        const setTemplates = await prisma.setTemplate.findMany({});
        res.json(setTemplates);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch set templates" });
    }
};

// Get A SET TEMPLATE BY ID
export const getSetTemplateById = async (req: Request<SetTemplate>, res: Response) => {
    try { 
        const { id } = req.params;
        const setTemplate = await prisma.setTemplate.findUnique({
            where: { id: Number(id) }
        });
        if (!setTemplate) {
            return res.status(404).json({ error: "Set template not found" });
        }
        res.json(setTemplate);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch set template" });
    }   
};

// POST (create a new SET TEMPLATE)
export const createSetTemplate = async (req: Request, res: Response) => {
    try {
        const { reps, weight, tempo, type, exerciseId } = req.body;
        const newSetTemplate = await prisma.setTemplate.create({
            data: { reps, weight, tempo, type, exerciseId: Number(exerciseId) }
        });
        res.status(201).json(newSetTemplate);
    } catch (error) {
        res.status(500).json({ error: "Failed to create set template" });
    }
};

// PUT update SET TEMPLATE by Id
export const updateSetTemplate = async (req: Request<SetTemplate>, res: Response) => {
    try {
        const { id } = req.params;
        const { reps, weight, tempo, type, exerciseId } = req.body;
        const updatedSetTemplate = await prisma.setTemplate.update({
            where: { id: Number(id) },
            data: { reps, weight, tempo, type, exerciseId: Number(exerciseId) }
        });
        res.json(updatedSetTemplate);
    } catch (error) {
        res.status(500).json({ error: "Failed to update set template" });
    }
};

// DELETE SET TEMPLATE by Id
export const deleteSetTemplate = async (req: Request<SetTemplate>, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.setTemplate.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete set template" });
    }
};