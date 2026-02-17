import type { Request, Response } from 'express';
import prisma from '../utils/prisma';
import type { Workout} from '../types/workout.type';

// GET all workouts
export const getAllWorkouts = async (req: Request<Workout>, res: Response) => {
    try {
        const { programId, userId } = req.query;

        if (!userId) {
        return res.status(400).json({ message: "userId is required" });
        }

        const workouts = await prisma.workout.findMany({
        where: { programId: Number(programId), userId: Number(userId) },
        include: { workoutExercises: true },
        });
        res.status(200).json(workouts);

        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }   
};

// GET workout by ID
export const getWorkoutById = async (req: Request<Workout>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const workout = await prisma.workout.findUnique({
            where: { id: Number(id) },
            include: { workoutExercises: {include: { exercise: true }} },
        });
        if (!workout) {
            res.status(404).json({ message: 'Entraînement non trouvé' });
            return;
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }  
};

// POST create a new workout
export const createWorkout = async (req: Request, res: Response) => {
    try {
        const { userId, name, order, frequency, exercises } = req.body;

        const newWorkout = await prisma.workout.create({
            data: {
                userId: Number(userId),
                name,
                order,
                frequency,
                workoutExercises: {
                    create: exercises?.map((e: any) => ({
                        exerciseId: e.exerciseId,
                        notes: e.notes || "",
                    })) || []
                }
            },
            include: {
                workoutExercises: true, // includes the exercises in the response
            },
        });

        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};


// PUT update workout by ID
export const updateWorkout = async (req: Request<Workout>, res: Response): Promise<void> => {
    try { 
        const workoutExists = await prisma.workout.findUnique({ where: { id: Number(req.params.id) } });

        if (!workoutExists) {
            res.status(404).json({ message: 'Entraînement introuvable' });
            return;
        }
        
        const { id } = req.params;
        const { name, frequency, order } = req.body;
        const updatedWorkout = await prisma.workout.update({
            where: { id: Number(id) },
            data: { name, frequency, order },
        });
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

// DELETE workout by ID
export const deleteWorkout = async (req: Request<Workout>, res: Response): Promise<void> => {
    try {  

        const workoutExists = await prisma.workout.findUnique({ where: { id: Number(req.params.id) } });

        if (!workoutExists) {
            res.status(404).json({ message: 'Entraînement introuvable' });
            return;
        }
        
        const { id } = req.params;
        await prisma.workout.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};