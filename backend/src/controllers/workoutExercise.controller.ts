import type { Request, Response } from 'express';
import prisma from '../utils/prisma';
import type { WorkoutExercise } from '../types/workoutExercise.type';

// GET All WORKOUT EXERCISES
export const getAllWorkoutExercises = async (req: Request, res: Response) => {
    try {
        const workoutExercises = await prisma.workoutExercise.findMany({
            include: { exercise: true, workout: true, workoutSets: true }
        });
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
            where: { id: Number(id) }, include: { exercise: true, workout: true, workoutSets: true }
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
export const createWorkoutExercise = async (req: Request<WorkoutExercise>, res: Response) => {
    try {
        const { workoutId, exerciseId, notes } = req.body;

        if (!workoutId || !exerciseId || !notes) {
            return res.status(400).json({ error: "Workout ID, Exercise ID, and notes are required" });
        }

        const newWorkoutExercise = await prisma.workoutExercise.create({
            data: { workoutId : workoutId as number, exerciseId : exerciseId as number, notes: notes as string },
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
        const { workoutId, exerciseId, notes } = req.body;

        const existingWorkoutExercise = await prisma.workoutExercise.findUnique({
            where: { id: Number(id) }
        });
        if (!existingWorkoutExercise) {
            return res.status(404).json({ error: "Workout exercise not found" });
        }

        const updatedWorkoutExercise = await prisma.workoutExercise.update({
            where: { id: Number(id) },
            data: { workoutId: Number(workoutId), exerciseId: Number(exerciseId), notes}
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

        const existingWorkoutExercise = await prisma.workoutExercise.findUnique({
            where: { id: Number(id) }
        });
        if (!existingWorkoutExercise) {
            return res.status(404).json({ error: "Workout exercise not found" });
        }

        await prisma.workoutExercise.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete workout exercise" });
    }   
};

