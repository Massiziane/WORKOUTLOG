import type { Request, Response } from 'express';
import prisma from '../utils/prisma';
import type { WorkoutExercise } from '../types/workoutExercise.type';

// GET All WORKOUT EXERCISES
export const getAllWorkoutExercises = async (req: Request, res: Response) => {
    try {
        const workoutExercises = await prisma.workoutExercise.findMany({});
        res.json(workoutExercises);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workout exercises" });
    }
};

// Get A WORKOUT EXERCISE BY ID
export const getWorkoutExerciseById = async (req: Request<WorkoutExercise>, res: Response) => {
    try {
        const { id } = req.params;
        const workoutExercise = await prisma.workoutExercise.findUnique({
            where: { id: Number(id) }
        });
        if (!workoutExercise) {
            return res.status(404).json({ error: "Workout exercise not found" });
        }
        res.json(workoutExercise);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workout exercise" });
    }
};

// POST (create a new WORKOUT EXERCISE)
export const createWorkoutExercise = async (req: Request, res: Response) => {
    try {
        const { workoutId, exerciseId} = req.body;
        const newWorkoutExercise = await prisma.workoutExercise.create({
            data: { workoutId, exerciseId }
        });
        res.status(201).json(newWorkoutExercise);
    } catch (error) {
        res.status(500).json({ error: "Failed to create workout exercise" });
    }
};

// PUT update WORKOUT EXERCISE by Id
export const updateWorkoutExercise = async (req: Request<WorkoutExercise>, res: Response) => {
    try {
        const { id } = req.params;
        const { workoutId, exerciseId } = req.body;
        const updatedWorkoutExercise = await prisma.workoutExercise.update({
            where: { id: Number(id) },
            data: { workoutId: Number(workoutId), exerciseId: Number(exerciseId) }
        });
        res.json(updatedWorkoutExercise);
    } catch (error) {
        res.status(500).json({ error: "Failed to update workout exercise" });
    }   
};


// DELETE WORKOUT EXERCISE by Id
export const deleteWorkoutExercise = async (req: Request<WorkoutExercise>, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.workoutExercise.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete workout exercise" });
    }   
};

