import type { Request, Response } from "express";
import prisma from "../utils/prisma";
import type { WorkoutSet } from "../types/workoutSet.type";

// GET All WORKOUT SETS
export const getAllWorkoutSets = async (req: Request, res: Response) => {
    try {
        const workoutSets = await prisma.workoutSet.findMany({});
        res.json(workoutSets);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workout sets" });
    }
};

// GET WORKOUT SET BY ID
export const getWorkoutSetById = async (req: Request<WorkoutSet>, res: Response) => {
    try {
        const { id } = req.params;
        const workoutSet = await prisma.workoutSet.findUnique({
            where: { id: Number(id) }
        });
        if (!workoutSet) {
            return res.status(404).json({ error: "Workout set not found" });
        }
        res.json(workoutSet);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workout set" });
    }
};

// POST (create a new WORKOUT SET)
export const createWorkoutSet = async (req: Request, res: Response) => {
    try {
        const { workoutExerciseId, reps, weight, tempo, restTime, setNumber, order } = req.body;
        const newWorkoutSet = await prisma.workoutSet.create({
            data: { workoutExerciseId: Number(workoutExerciseId), reps, weight, tempo, restTime, setNumber, order }
        });
        res.status(201).json(newWorkoutSet);
    } catch (error) {
        res.status(500).json({ error: "Failed to create workout set" });
    }  
};

// PUT update WORKOUT SET by Id
export const updateWorkoutSet = async (req: Request<WorkoutSet>, res: Response) => {
    try {
        const { id } = req.params;
        const { reps, weight, tempo, restTime, workoutExerciseId, setNumber, order } = req.body;

        const existingWorkoutSet = await prisma.workoutSet.findUnique({
            where: { id: Number(id) }
        });
        if (!existingWorkoutSet) {
            return res.status(404).json({ error: "Workout set not found" });
        }

        const updatedWorkoutSet = await prisma.workoutSet.update({
            where: { id: Number(id) },
            data: { reps, weight, tempo, restTime, workoutExerciseId, setNumber, order }
});
        res.json(updatedWorkoutSet);
    } catch (error) {
        res.status(500).json({ error: "Failed to update workout set" });
    }
};

// DELETE WORKOUT SET by Id
export const deleteWorkoutSet = async (req: Request<WorkoutSet>, res: Response) => {
    try {
        const { id } = req.params;

        const existingWorkoutSet = await prisma.workoutSet.findUnique({
            where: { id: Number(id) }
        })
        if (!existingWorkoutSet) {
            return res.status(404).json({ error: "Workout set not found" });
        }

        await prisma.workoutSet.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete workout set" });
    }
};