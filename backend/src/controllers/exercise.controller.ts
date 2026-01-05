import { type Request, type Response} from 'express';
import prisma from '../utils/prisma';
import type { Exercise } from '../types/exercise.type';


// GET /exercises
export const getAllExercises = async (req: Request<Exercise>, res: Response) => {
    try {
        const exercises = await prisma.exercise.findMany({});
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// GET /exercises/:id   
export const getExerciseById = async (req: Request<Exercise>, res: Response) => {
    const { id } = req.params;
    try {
        const exercise = await prisma.exercise.findUnique({
            where: { id: Number(id) },
        });
        if (exercise) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } 
};

// POST /exercises
export const createExercise = async (req: Request<Exercise>, res: Response) => {
    const { name, notes, programId, categoryId } = req.body;
    try {
        const newExercise = await prisma.exercise.create({
            data: { name, notes, programId: Number(programId), categoryId: Number(categoryId) },
        });
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// UPDATE /exercises/:id
export const updateExercise = async (req: Request<Exercise>, res: Response) => {
    const { id } = req.params;
    const { name, notes, programId, categoryId } = req.body;
    try {
        const updatedExercise = await prisma.exercise.update({
            where: { id: Number(id) },
            data: { name, notes, programId, categoryId },
        });
        res.status(200).json(updatedExercise);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE /exercises/:id
export const deleteExercise = async (req: Request<Exercise>, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.exercise.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


